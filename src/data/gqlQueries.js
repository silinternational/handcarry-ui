import { gql } from './api'
//TODO: need to make naming conventions consistent

export function user() {
  return gql(`{
    user {
      organizations {
        id
        name
      }
    }
  }`)
}

export function requests() {
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
  // TODO: not sure what's actually needded her, just provided many of the properties as a default
  return gql(`{
    post(id: "${id}") {
      title
      description
      destination
      origin
      size
      neededAfter
      neededBefore
      category
      status
      createdAt
      updatedAt
      createdBy {
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
  }`)
}

export function post(post) {
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
      }) 
      {
        title
      }
    }
  `)
}

export function updatePost(post) {
  return gql(`
    mutation {
      updatePostStatus(
        input: {
          id: "${post.id}"
          status: "${post.status}"
        }
      ) 
      {
        id
      }
    }
  `)
}

export function myConversations() {
  return gql(`{
    myThreads {
      id
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
              firstName
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
