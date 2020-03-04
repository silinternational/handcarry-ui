import { getAuthzHeader } from './token'
import { throwError } from './error'
import polyglot from '../i18n'
import { clearApp } from './storage'

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
export async function wrappedFetch(url, body) {
  const headers = {
    authorization: getAuthzHeader(),
    'content-type': 'application/json',
  }

  // when dealing with FormData, i.e., when uploading files, allow the browser to set the request up
  // so boundary information is built properly.
  if (body instanceof FormData) {
    delete headers['content-type']
  }

  // reminder: fetch does not throw exceptions for non-200 responses (https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
  const response = await fetch(`${process.env.BASE_API_URL}/${url}`, {
    method: 'post',
    credentials: 'include', // ensures the response back from the api will be allowed to "set-cookie"
    headers,
    body,
  })

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
  }

  // errors found in one of two places:
  //   buffalo => `key` (to be derived)
  //   gql => `errors[0].message`
  throwError(polyglot.t(contents.key) || contents.errors[0].message, response.status)
}

export async function gql(query) {
  const body = JSON.stringify({
    query
  })
  
  const response = await wrappedFetch('gql', body)
  
  if (response.errors) { 
    throwError(response.errors[0].message)
  }

  return response.data
}

export function getInviteInfo(code) {
  return wrappedFetch(`auth/invite?code=${encodeURIComponent(code)}`)
}

export const upload = async formData => await wrappedFetch('upload', formData)
