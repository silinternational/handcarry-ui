import { writable } from 'svelte/store'
import { 
  markMessagesAsRead, 
  getMyConversations,
  sendMessage
} from './gqlQueries'

export const conversations = writable([])
export const unreads = writable([])

let intervalId = 0

export function init() {
  const EVERY_MINUTE = 60 * 1000
  intervalId = setInterval(loadConversations, EVERY_MINUTE)

  loadConversations()
  
  const excludeRead = ({ unreadMessageCount }) => unreadMessageCount > 0
  const transform = ({ id, unreadMessageCount }) => ({id, count: unreadMessageCount})
  conversations.subscribe(convos => unreads.set(convos.filter(excludeRead).map(transform)))
}

export function listOtherParticipants(conversation, me) {
  const participants = conversation.participants || []
  return participants.filter(user => user.id !== me.id).map(user => user.nickname).join(', ')
}

async function loadConversations() {
  try {
    const myConversations = await getMyConversations()
    
    conversations.set(myConversations)
  } catch (e) {
    clearInterval(intervalId)

    throw e
  }
}

export async function saw(conversationId) {
  try {
    const updatedConversation = await markMessagesAsRead(conversationId)
  
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

export async function send(message, conversation) {
  const updatedConversation = await sendMessage(message, conversation)

  conversations.update(currentConversations => {
    const i = currentConversations.findIndex(({ id }) => id === updatedConversation.id)
    if (i >= 0) {
      currentConversations[i] = updatedConversation
    } else {
      currentConversations = [updatedConversation, ...currentConversations]
    }

    return currentConversations
  })

  return updatedConversation
}

export function reset() {
  conversations.set([])
  unreads.set([])
}