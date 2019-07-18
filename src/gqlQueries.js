import { gql } from './api'

// export function geoLocation(ip) {
//    return gql(`{
//       getLocation(ip: "${ip}") {
//         country {
//           names {
//             en
//           }
//           geoname_id
//           iso_code
//         }
//         location {
//           latitude
//           longitude
//         }
//       }
//     }`)
// }

export function posts() {
   return gql(`{
     posts {
       title
     }
    }`)
}
export function post(post) {
  return gql(`
    mutation {
      createPost(input: {
        orgID: "${post.orgID}",
        createdByID: "${post.createdByID}",
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
