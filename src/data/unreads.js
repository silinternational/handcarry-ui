import { writable } from 'svelte/store'
import { getMessageCounts, markMessagesAsRead } from './gqlQueries'

const unreads = writable([])

loadMessageCounts()

export default unreads

async function loadMessageCounts() {
  try {
    const { myThreads } = await getMessageCounts()
    const conversationsWithUnreadMessages = myThreads.filter(conversation => conversation.unreadMessageCount > 0)

    unreads.set(conversationsWithUnreadMessages.map(transform))
  } catch (e) {
    console.error(e)
    //TODO: need errorhandling
  }
}

const transform = conversation => ({
  id: conversation.id,
  count: conversation.unreadMessageCount,
})

export async function saw(conversationId) {
  try {
    const { setThreadLastViewedAt } = await markMessagesAsRead(conversationId)
    const updatedConversation = setThreadLastViewedAt
    
    unreads.update(currentUnreads => {
      // instead of using an index here, would finding the object and updating it work too?
      const i = currentUnreads.findIndex(unread => unread.id === conversationId)

      if (i > -1) {
        currentUnreads[i].count = updatedConversation.unreadMessageCount
      }

      return currentUnreads.filter(unread => unread.count > 0)
    })
  } catch (e) {
    console.error(e)
    //TODO: need errorhandling
  }
}
