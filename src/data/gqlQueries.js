import { gql } from './api'

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
      id
      title
      destination {
        description
      }
      createdBy {
        id
        nickname
        photoURL
      }
      provider {
        id
      }
      neededAfter
      neededBefore
      category
      size
      photo {
        url
      }
    }
    user {
      id
    }
  }`)
}

export function getRequest(id) {
  // TODO: not sure what's actually needed here, just provided many of the properties as a default
  return gql(`{
    post(id: "${id}") {
      id
      title
      description
      destination {
        description
      }
      url
      size
      photo {
        url
      }
      createdBy {
        id
        nickname
      }
      receiver {
        nickname
      }
      provider {
        nickname
      }
      organization {
        name
      }
      threads {
        id
      }
    }
    user {
      id
    }
  }`)
}

export function getMyRequests() {
  return gql(`{
    user {
      posts(role: CREATEDBY) {
        id
        status
        title
        description
        destination {
          description
        }
        neededAfter
        neededBefore
        provider {
          nickname
        }
      }
    }
  }`)
}

export function getMyCommitments() {
  return gql(`{
    user {
      posts(role: PROVIDING) {
        title
        description
        destination {
          description
        }
        neededAfter
        neededBefore
        provider {
          nickname
        }
      }
    }
  }`)
}

export function createPost(post) {
  return gql(`
    mutation {
      createPost(input: {
        orgID: "${post.orgID}",
        type: ${post.type},
        title: """${post.title}""",
        description: """${post.description}""",
        destination: {
          description: """${post.destination.description}""",
          latitude: ${post.destination.latitude},
          longitude: ${post.destination.longitude},
          country: "${post.destination.country}"
        },
        photoID: "${post.photoID}",
        size: ${post.size}
      }) 
      {
        title
      }
    }
  `)
}

export function sendCommit(postId) {
  return gql(`
    mutation {
      updatePost(
        input: {
          id: "${postId}",
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
        neededAfter
        neededBefore
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
          id: "${postId}",
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
        neededAfter
        neededBefore
        provider {
          id
          nickname
        }
      }
    }
  `)
}

export function confirmReceipt(postId) {
  return gql(`
    mutation {
      updatePost(
        input: {
          id: "${postId}",
          status: RECEIVED
        }
      ) 
      {
        id
      }
    }
  `)
}

export function cancelPost(postId) {
  return gql(`
    mutation {
      updatePost(
        input: {
          id: "${postId}",
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
        neededAfter
        neededBefore
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
    user {
      id
    }
  }`)
}

export function sendMessage(threadId, message, postId) {
  return gql(`
    mutation {
      createMessage(input: {
        threadID: "${threadId || ''}",
        content: """${message}""",
        postID: "${postId || ''}"
      }) 
      {
        thread {
          id
          messages {
            id
            sender {
              id
              nickname
            }
            content
            createdAt
          }
        }    
      }
    }
  `)
}
