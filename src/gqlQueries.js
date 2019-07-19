import { gql } from './api'

export function posts() {
   return gql(`{
     posts {
       id
       title
       destination
       type
       status
       neededAfter
       neededBefore
       category
     }
   }`)
}
export function post(post) {
  return gql(`
    mutation {
      createPost(input: {
        orgID: "${post.orgID}", // user.authorg.uuid
        type: ${post.type},
        title: "${post.title}",
        description: "${post.description}",
        origin: "${post.origin}",
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
