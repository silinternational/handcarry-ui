import { gql } from './api'

export async function getUser() {
  const { user } = await gql(`{
    user {
      id
      email
      nickname
      photoURL
      organizations {
        id
        name
      }
    }
  }`)

  return user
}

export async function getRequests() {
  const { posts } = await gql(`{
    posts {
      ${postFields}
    }
  }`)

  return posts
}

export async function createRequest(request) {
  const { createPost } = await gql(`
    mutation {
      createPost(input: {
        description: ${json(request.description || '')},
        destination: {
          country: ${json(request.destination.country)}
          description: ${json(request.destination.description)},
          latitude: ${json(request.destination.latitude)},
          longitude: ${json(request.destination.longitude)},
        },
        orgID: ${json(request.orgID)},
        photoID: ${json(request.photoID || '')},
        size: ${request.size}
        title: ${json(request.title)},
        type: ${request.type},
      }) 
      {
        ${postFields}
      }
    }
  `)

  return createPost
}

export const cancelRequest = async requestId => updateRequest(requestId, 'REMOVED')
export const acceptCommittment = async requestId => updateRequest(requestId, 'ACCEPTED')
export const commitToProvide = async requestId => updateRequest(requestId, 'COMMITTED')

async function updateRequest(id, status) {
  const { updatePost } = await gql(`
    mutation {
      updatePost(
        input: {
          id: ${json(id)},
          status: ${status}
        }
      ) 
      {
        ${postFields}
      }
    }
  `)

  return updatePost
}

export async function getMyConversations() {
  const { myThreads } = await gql(`{
    myThreads {
      ${threadFields}
    }
  }`)

  return myThreads
}

export async function sendMessage(message, conversation) {
  const { createMessage } = await gql(`
    mutation {
      createMessage(input: {
        content: ${json(message)},
        postID: ${json(conversation.post.id || '')}
        threadID: ${json(conversation.id || '')},
      }) 
      {
        thread {
          ${threadFields}
        }    
      }
    }
  `)

  return createMessage.thread
}

export async function markMessagesAsRead(threadId) {
  const { setThreadLastViewedAt } = await gql(`
    mutation {
      setThreadLastViewedAt(input: {
        threadID: ${json(threadId || '')},
        time: ${json(new Date().toISOString())}
      }) 
      {
        ${threadFields}
      }
    }
  `)

  return setThreadLastViewedAt
}

const json = JSON.stringify
const postFields = `
  createdBy {
    id
    nickname
    photoURL
  }
  description
  destination {
    description
  }
  id
  organization {
    name
  }
  photo {
    url
  }
  provider {
    id
    nickname
  }
  receiver {
    nickname
  }
  size
  status
  title
`
const messageFields = `
  content
  createdAt
  id
  sender {
    id
    nickname
  }
`
const threadFields = `
  id
  messages {
    ${messageFields}
  }
  participants {
    id
    nickname
  }
  post {
    ${postFields}
  }
  unreadMessageCount
`
