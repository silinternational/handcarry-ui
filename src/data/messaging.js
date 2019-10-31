import { writable } from 'svelte/store'
import { getMessageCounts, markMessagesAsRead } from './gqlQueries'

export const unreads = writable([])

const EVERY_MINUTE = 1000
setInterval(loadMessageCounts, EVERY_MINUTE)

async function loadMessageCounts() {
  const unread = ({ unreadMessageCount }) => unreadMessageCount > 0
  const transform = ({ id, unreadMessageCount }) => ({
    id,
    count: unreadMessageCount,
  })

  try {
    const { myThreads: allConversations } = await getMessageCounts()
    
    unreads.set(allConversations.filter(excludeRead).map(transform))
  } catch (e) {
    console.error(`can't retrieve unread message count at this time, absorbing exception: ${e}`)
  }
}

export async function saw(conversationId) {
  try {
    const { setThreadLastViewedAt: updatedConversation } = await markMessagesAsRead(conversationId)

    unreads.update(removeRecentlyRead(updatedConversation))
  } catch (e) {
    console.error(`can't update last viewed for ${conversationId} at this time so messages will continue to show as unread, absorbing exception: ${e}`)
  }
}

const removeRecentlyRead = updatedConversation => currentUnreads => {
  const matchingUnread = currentUnreads.find(unread => unread.id === updatedConversation.id)

  if (matchingUnread) {
    matchingUnread.count = updatedConversation.unreadMessageCount
  }

  return currentUnreads.filter(({ count }) => count > 0)
}
