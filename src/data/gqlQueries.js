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

export function sendCommit(post) {
  return gql(`
    mutation {
      updatePost(
        input: {
          id: "${post.id}",
          providerID: "${post.provider.id}",
          status: COMMIT
        }
      ) 
      {
        id
        title
        createdBy {
          id
          nickname
        }
        destination
        neededAfter
        neededBefore
        provider {
          nickname
        }
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
        title
        createdBy {
          id
          nickname
        }
        destination
        neededAfter
        neededBefore
        provider {
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

export function sendMessage(id, message) {
  return gql(`
    mutation {
      createMessage(input: {
        threadID: "${id}",
        content: "${message}",
        postID: ""
      }) 
      {
        thread {
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

export function startConversation(postId, message) {
  return gql(`
    mutation {
      createMessage(input: {
        postID: "${postId}",
        content: "${message}"
      })
      {
        thread { id }
      }
    }
  `)
}
