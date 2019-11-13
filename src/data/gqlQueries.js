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
          description: ${json(request.destination.description)},
          latitude: ${json(request.destination.latitude)},
          longitude: ${json(request.destination.longitude)},
          country: ${json(request.destination.country)}
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
        id
        status
        title
        createdBy {
          id
          nickname
        }
        destination {
          description
        }
        provider {
          id
          nickname
        }
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
        id
        status
        title
        createdBy {
          id
          nickname
        }
        destination {
          description
        }
        provider {
          id
          nickname
        }
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
        id
      }
    }
  `)
}

export function getMyConversations() {
  return gql(`{
    myThreads {
      id
      participants {
        id
        nickname
      }
      post {
        id
        status
        title
        createdBy {
          id
          nickname
        }
        destination {
          description
        }
        provider {
          id
          nickname
        }
      }
      messages {
        id
        createdAt
        sender {
          id
          nickname
        }
        content
      }
      unreadMessageCount
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
          id
          participants {
            id
            nickname
          }
          post {
            id
            status
            title
            createdBy {
              id
              nickname
            }
            destination {
              description
            }
            provider {
              id
              nickname
            }
          }
          messages {
            id
            createdAt
            sender {
              id
              nickname
            }
            content
          }
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
        id
        unreadMessageCount
      }
    }
  `)
}

const postFields = `
  id
  title
  description
  destination {
    description
  }
  createdBy {
    id
    nickname
    photoURL
  }
  receiver {
    nickname
  }
  provider {
    id
    nickname
  }
  organization {
    name
  }
  size
  photo {
    url
  }
  threads {
    id
    participants {
      id
      nickname
    }
    post {
      id
      title
      createdBy {
        id
        nickname
      }
      destination {
        description
      }
      status
      provider {
        id
        nickname
      }
    }
    messages {
      createdAt
      sender {
        id
        nickname
      }
      content
    }
  }
`
