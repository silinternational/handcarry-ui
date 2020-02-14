import { gql } from './api'

export async function getUser() {
  const response = await gql(`{
    user {
      ${userFields}
    }
  }`)

  return response.user || {}
}

export async function updateNickname(nickname) {
  const response = await gql(`
    mutation {
      updateUser(input: {
        nickname: ${json(nickname)}
      })
      {
        ${userFields}
      }
    }
  `)

  return response.updateUser || {}
}

export async function updateProfilePic(id) {
  const response = await gql(`
    mutation {
      updateUser(input: {
        photoID: ${json(id)}
      })
      {
        ${userFields}
      }
    }
  `)

  return response.updateUser || {}
}

export async function getRequests() {
  const response = await gql(`{
    posts {
      ${postFields}
    }
  }`)

  return response.posts || []
}

export async function createRequest(request) {
  const response = await gql(`
    mutation {
      createPost(input: {
        description: ${json(request.description || '')},
        destination: ${formatLocationForGql(request.destination)},
        kilograms: ${json(defaultFor(request.kilograms, null))}, 
        neededBefore: ${json(request.neededBefore || null)}, 
        origin: ${formatLocationForGql(request.origin)},
        orgID: ${json(request.orgID)},
        photoID: ${json(request.photoID || null)},
        size: ${request.size},
        title: ${json(request.title)},
        type: REQUEST,
        visibility: ${request.visibility},
      }) 
      {
        ${postFields}
      }
    }
  `)

  return response.createPost || {}
}

export async function updateRequest(request) {
  // TODO: When API is updated to erase values when we send `null`, update `|| something` to `|| null`
  const response = await gql(`
    mutation {
      updatePost(input: {
        description: ${json(request.description || '')},
        kilograms: ${json(request.kilograms)}, 
        id: ${json(request.id)},
        neededBefore: ${json(request.neededBefore || null)}, 
        photoID: ${json(request.photoID || null)},
        size: ${request.size},
        title: ${json(request.title)},
        visibility: ${request.visibility},
      }) 
      {
        ${postFields}
      }
    }
  `)

  return response.updatePost || {}
}

export async function offerToProvide(requestId) {
  const response = await gql(`
    mutation {
      addMeAsPotentialProvider(
        postID: ${json(requestId)},
      )
      {
        ${postFields}
      }
    }
  `)

  return response.addMeAsPotentialProvider || {}  
}

export const cancelRequest = async requestId => updateRequestStatus(requestId, 'REMOVED')
export const acceptOfferToProvide = async (requestId, providerUserId) => updateRequestStatus(requestId, 'ACCEPTED', providerUserId)
export const delivered = async requestId => updateRequestStatus(requestId, 'DELIVERED')
export const received = async requestId => updateRequestStatus(requestId, 'COMPLETED')

async function updateRequestStatus(id, status, providerUserId = null) {
  const response = await gql(`
    mutation {
      updatePostStatus(
        input: {
          id: ${json(id)},
          status: ${status},
          providerUserID: ${json(providerUserId)}
        }
      ) 
      {
        ${postFields}
      }
    }
  `)

  return response.updatePostStatus || {}
}

export async function getMyConversations() {
  const response = await gql(`{
    myThreads {
      ${threadFields}
    }
  }`)

  return response.myThreads || []
}

export async function sendMessage(message, conversation) {
  const response = await gql(`
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

  return response.createMessage && response.createMessage.thread || { thread: {}}
}

export async function markMessagesAsRead(threadId) {
  const response = await gql(`
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

  return response.setThreadLastViewedAt || {}
}

const defaultFor = function(value, defaultValue) {
  return (value === undefined) ? defaultValue : value
}

const json = JSON.stringify

const formatLocationForGql = function (location) {
  if (location) {
    return `{
      country: ${json(location.country)},
      description: ${json(location.description)},
      latitude: ${json(location.latitude)},
      longitude: ${json(location.longitude)},
    }`
  }
  return `null`
}

const userFields = `
  avatarURL
  email
  id
  nickname
  organizations {
    id
    name
  }
`

const postFields = `
  createdBy {
    avatarURL
    id
    nickname
  }
  description
  destination {
    description
    latitude
    longitude
    country
  }
  origin {
    description
    latitude
    longitude
    country
  }
  id
  kilograms
  neededBefore
  organization {
    name
  }
  photo {
    url
  }
  potentialProviders {
    id
    nickname
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
  visibility
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
