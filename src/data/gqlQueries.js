import { gql } from './api'

export async function getUser() {
  const response = await gql(`{
    user {
      ${userFields}
    }
  }`)

  return response.user || {}
}

export async function updateUser(user) {
  const response = await gql(`
    mutation {
      user:updateUser(input: {
        nickname: ${json(user.nickname)}
        photoID: ${json(user.photoID)}
      })
      {
        ${userFields}
      }
    }
  `)

  return response.user || {}
}

export async function getRequests() {
  const response = await gql(`{
    requests {
      ${requestFields}
    }
  }`)

  return response.requests || []
}

export async function createRequest(request) {
  const response = await gql(`
    mutation {
      request:createRequest(input: {
        description: ${json(request.description || '')},
        destination: ${formatLocationForGql(request.destination)},
        kilograms: ${json(defaultFor(request.kilograms, null))}, 
        neededBefore: ${json(request.neededBefore || null)}, 
        origin: ${formatLocationForGql(request.origin)},
        orgID: ${json(request.orgID)},
        photoID: ${json(request.photoID || null)},
        size: ${request.size},
        title: ${json(request.title)},
        visibility: ${request.visibility},
      }) 
      {
        ${requestFields}
      }
    }
  `)

  return response.request || {}
}

export async function updateRequest(request) {
  // TODO: When API is updated to erase values when we send `null`, update `|| something` to `|| null`
  const response = await gql(`
    mutation {
      request:updateRequest(input: {
        description: ${json(request.description || '')},
        destination: ${formatLocationForGql(request.destination)},
        kilograms: ${json(request.kilograms)}, 
        id: ${json(request.id)},
        neededBefore: ${json(request.neededBefore || null)}, 
        origin: ${formatLocationForGql(request.origin)},
        photoID: ${json(request.photoID || null)},
        size: ${request.size},
        title: ${json(request.title)},
        visibility: ${request.visibility},
      }) 
      {
        ${requestFields}
      }
    }
  `)

  return response.request || {}
}

export async function offerToProvide(requestId) {
  const response = await gql(`
    mutation {
      request:addMeAsPotentialProvider(
        requestID: ${json(requestId)},
      )
      {
        ${requestFields}
      }
    }
  `)

  return response.request || {}  
}

export const cancelRequest = async requestId => updateRequestStatus(requestId, 'REMOVED')
export const acceptOfferToProvide = async (requestId, providerUserId) => updateRequestStatus(requestId, 'ACCEPTED', providerUserId)
export const delivered = async requestId => updateRequestStatus(requestId, 'DELIVERED')
export const received = async requestId => updateRequestStatus(requestId, 'COMPLETED')

async function updateRequestStatus(id, status, providerUserId = null) {
  const response = await gql(`
    mutation {
      request:updateRequestStatus(
        input: {
          id: ${json(id)},
          status: ${status},
          providerUserID: ${json(providerUserId)}
        }
      ) 
      {
        ${requestFields}
      }
    }
  `)

  return response.request || {}
}

export async function getMyConversations() {
  const response = await gql(`{
    conversations:myThreads {
      ${threadFields}
    }
  }`)

  return response.conversations || []
}

export async function sendMessage(message, conversation) {
  const response = await gql(`
    mutation {
      message:createMessage(input: {
        content: ${json(message)},
        requestID: ${json(conversation.request.id || '')}
        threadID: ${json(conversation.id || '')},
      }) 
      {
        thread {
          ${threadFields}
        }    
      }
    }
  `)

  return response.message && response.message.thread || { thread: {}}
}

export async function markMessagesAsRead(threadId) {
  const response = await gql(`
    mutation {
      conversation:setThreadLastViewedAt(input: {
        threadID: ${json(threadId || '')},
        time: ${json(new Date().toISOString())}
      }) 
      {
        ${threadFields}
      }
    }
  `)

  return response.conversation || {}
}

export async function getEvents() {
  const response = await gql(`{
    meetings {
      ${meetingFields}
    }
  }`)

  return response.meetings || []
}

export async function joinEvent(eventId) {
  const response = await gql(`
    mutation {
      participant:createMeetingParticipant(input: {
        meetingID: ${json(eventId)},
      })
      {
        meeting {
          ${meetingFields}
        }
      }
    }
  `)

  return response.participant.meeting
}

export async function createWatch(name, filters) {
  const response = await gql(`
    mutation {
      watch:createWatch(input: {
        name: ${json(name)},
        destination: ${formatLocationForGql(filters.destination.value)},
        origin: ${formatLocationForGql(filters.origin.value)},
        meetingID: ${json(defaultFor(filters.event.value, null))},
        searchText: ${json(defaultFor(filters.requestSearch.value, null))},
        size: ${defaultFor(filters.size.value && filters.size.value.toUpperCase(),"XLARGE")},
      })
      {
        id
      }
    }
  `)

  return response.watch.id
}

export async function getMyWatches() {
  const response = await gql(`{
    watches:myWatches {
      destination {
        description
      }
      id
      meeting {
        name
      }
      name
      origin {
        description
      }
      searchText
      size        
    }
  }`)

  return response.watches || []
}

export async function removeWatch(id) {
  const response = await gql(`
    mutation {
      watch:removeWatch(input: {
        id: ${json(id)}
      })
      {
        id
      }
    }
  `)

  return response.watch.id
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
  photoID
`

const requestFields = `
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
  meeting {
    id
    name
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
  photoID
  potentialProviders {
    id
    nickname
  }
  provider {
    id
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
  request {
    ${requestFields}
  }
  unreadMessageCount
`

const meetingFields = `
  id
  name
  location {
    description
  }
  participants {
    user {
      id
    }
  }
  startDate
  endDate
  moreInfoURL
  imageFile {
    url
  }
`
