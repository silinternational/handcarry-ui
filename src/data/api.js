import { getAuthzHeader } from './token'
import { throwError } from './error'
import polyglot from '../i18n'
import { clearApp } from './storage'

export const POST   = async (uri, body) => await wrappedFetch('post'  , uri, body)
export const GET    = async (uri      ) => await wrappedFetch('get'   , uri      )
export const PUT    = async (uri, body) => await wrappedFetch('put'   , uri, body)
export const DELETE = async (uri, body) => await wrappedFetch('delete', uri, body)

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
export async function wrappedFetch(method, url, body) {
  const headers = {
    authorization: getAuthzHeader(),
  }

  // when dealing with FormData, i.e., when uploading files, allow the browser to set the request up
  // so boundary information is built properly.
  if (!(body instanceof FormData)) {
    headers['content-type'] = 'application/json'
    body = JSON.stringify(body)
  }

  // reminder: fetch does not throw exceptions for non-200 responses (https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
  const response = await fetch(`${process.env.BASE_API_URL}/${url}`, {
    method,
    credentials: 'include', // ensures the response back from the api will be allowed to "set-cookie"
    headers,
    body,
  })

  if (response.status == 204) return null

  const contents = await response.json()

  // gql responses can be the following:
  //   200's can be good { data } or bad { errors, data }
  //   422 is also possible, e.g., if the gql syntax is wrong, { errors }
  // buffalo responses more similarly mimic REST, error format will be:
  //   { code, key } where the message to display must be derived from { key }

  if (response.ok) {
    return contents
  }

  if (response.status === 401) {
    clearApp()

    if (! ['/', '/login'].includes(location.pathname)) {
      location.replace(`${location.origin}/login?return-to=${location.pathname}`)
    }

    return response
  }

  throwError(polyglot.t(contents.key), response.status)
}

export function getInviteInfo(code) {
  return wrappedFetch('post', `auth/invite?code=${encodeURIComponent(code)}`)
}

export const upload = async formData => await wrappedFetch('post', 'upload', formData)

export const locationForApi = location => {
  if (location) {
    return {
      country: location.country,
      description: location.description,
      latitude: location.latitude,
      longitude: location.longitude,
    }
  }
  return null
}
