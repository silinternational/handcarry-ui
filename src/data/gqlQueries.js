import { gql } from './api'

const json = JSON.stringify

export function getUser() {
  return gql(`{
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
}

export function getRequests() {
  return gql(`{
    posts {
      ${postFields}
    }
  }`)
}

export function createRequest(request) {
  return gql(`
    mutation {
      createPost(input: {
        orgID: ${json(request.orgID)},
        type: ${request.type},
        title: ${json(request.title)},
        description: ${json(request.description || '')},
        destination: {
          country: ${json(request.destination.country)}
          description: ${json(request.destination.description)},
          latitude: ${json(request.destination.latitude)},
          longitude: ${json(request.destination.longitude)},
        },
        photoID: ${json(request.photoID || '')},
        size: ${request.size}
      }) 
      {
        ${postFields}
      }
    }
  `)
}

export function sendCommit(postId) {
  return gql(`
    mutation {
      updatePost(
        input: {
          id: ${json(postId)},
          status: COMMITTED
        }
      ) 
      {
        ${postFields}
      }
    }
  `)
}

export function acceptCommittment(postId) {
  return gql(`
    mutation {
      updatePost(
        input: {
          id: ${json(postId)},
          status: ACCEPTED
        }
      ) 
      {
        ${postFields}
      }
    }
  `)
}

export function cancelRequest(requestId) {
  return gql(`
    mutation {
      updatePost(
        input: {
          id: ${json(requestId)},
          status: REMOVED
        }
      ) 
      {
        ${postFields}
      }
    }
  `)
}

export function getMyConversations() {
  return gql(`{
    myThreads {
      ${threadFields}
    }
  }`)
}

export function sendMessage(message, conversation) {
  return gql(`
    mutation {
      createMessage(input: {
        content: ${json(message)},
        threadID: ${json(conversation.id || '')},
        postID: ${json(conversation.post.id || '')}
      }) 
      {
        thread {
           ${threadFields}
        }    
      }
    }
  `)
}

export function markMessagesAsRead(threadId) {
  return gql(`
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
}

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
