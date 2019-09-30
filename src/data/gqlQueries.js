import { gql } from './api'

export function getUser() {
  return gql(`{
    user {
      firstName
      lastName
      email
      nickname
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
       destination
       neededAfter
       neededBefore
       category
       size
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
      destination
      origin
      cost
      url
      size
      neededAfter
      neededBefore
      category
      status
      createdAt
      updatedAt
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
        destination
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
        destination
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
        title: "${post.title}",
        description: "${post.description}",
        destination: "${post.destination}",
        origin: "${post.origin || ''}",
        category: "${post.category || ''}",
        neededBefore: "${post.neededBefore || ''}",
        neededAfter: "${post.neededAfter || ''}",
        size: "${post.size}",
        url: "${post.url}",
        cost: "${post.cost}"
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
        destination
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
        destination
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
        destination
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
