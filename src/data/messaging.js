import { writable } from 'svelte/store'
import { 
  getMessageCounts, 
  markMessagesAsRead, 
  getMyConversations,
  sendMessage
} from './gqlQueries'

export const unreads = writable([])
export const conversations = writable([])

const EVERY_MINUTE = 60 * 1000
loadMessageCounts(); setInterval(loadMessageCounts, EVERY_MINUTE)
loadConversations(); setInterval(loadConversations, EVERY_MINUTE)
// TODO: consider situations where we'd want the intervals cancelled, e.g, 401

async function loadMessageCounts() {
  const excludeRead = ({ unreadMessageCount }) => unreadMessageCount > 0
  const transform = ({ id, unreadMessageCount }) => ({id, count: unreadMessageCount})

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

    unreads.update(currentUnreads => {
      const matchingUnread = currentUnreads.find(unread => unread.id === updatedConversation.id)
      
      if (matchingUnread) {
        // instead of simply matchingUnread.count = 0, leave room for the possibility 
        // another message came in during this update, i.e., maybe it's not a 0
        matchingUnread.count = updatedConversation.unreadMessageCount
      }
      
      return currentUnreads.filter(({ count }) => count > 0)
    })
  } catch (e) {
    console.error(`can't update last viewed for ${conversationId} at this time so messages will continue to show as unread, absorbing exception: ${e}`)
  }
}

async function loadConversations() {
  try {
    const { myThreads } = await getMyConversations()

    conversations.set(myThreads)
  } catch (e) {
    console.error(`messaging.js:loadConversations: `, e)
    // TODO: errorhandling?
  }
}

export async function send(message, conversation) {
  try {
    const { createMessage } = await sendMessage(message, conversation)
    const updatedConversation = createMessage.thread

    conversations.update(currentConversations => {
      const i = currentConversations.findIndex(({ id }) => id === updatedConversation.id)
      if (i >= 0) {
        currentConversations[i] = updatedConversation
      } else {
        currentConversations.push(updatedConversation)
      }

      return currentConversations
    })

    return updatedConversation
  } catch (e) {
    console.error(`messaging.js:send: `, e)
    //TODO: errorhandling?
  }
}
