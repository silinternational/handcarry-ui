import { gql } from './api'

export function user() {
  return gql(`{
    user() {
      id
      firstName
      lastName
      email
      nickname

    }
  }`)
}

export function posts() {
   return gql(`{
     posts {
       id
       title
       description
       destination
       type
       status
       neededAfter
       neededBefore
       category
       size
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
       postID
       messages {
        createdAt
        sender {
          id
          nickname
        }
        content
       }
     }
   }`)
}

export function sendMessage(message) {
  return gql(`
    mutation {
      createMessage(input: {
        threadID: "${message.threadID}",
        content: "${message.content}",
        postID: "${message.postID}"
      }) 
      {
        content
      }
    }
  `)
}

export function sendMessageToNewConversation(message) {
  return gql(`
    mutation {
      createMessage(input: {
        content: "${message.content}",
        postID: "${message.postID}"
      })
      {
        thread { id }
      }
    }
  `)
}
