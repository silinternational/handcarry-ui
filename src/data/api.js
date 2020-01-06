import token from './token'
import { throwError } from './error'
import polyglot from '../i18n'
import { reset as resetUser } from './user'
import { reset as resetMessaging } from './messaging'
import { reset as resetRequests } from './requests'

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
async function wrappedFetch(url, body) {
  const headers = {
    authorization: token.authzHeader(),
    'content-type': 'application/json',
  }

  // when dealing with FormData, i.e., when uploading files, allow the browser to set the request up properly
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
  // buffalo responses more similarly mimic REST, error formats follow two patterns though:
  //   { code, error } or { code, key }
  //   the message to display will either be in { error } or it will need to be derived from { key }, i.e., 
  //     key is intended for looking up the appropriate message

  if (response.ok) { 
    return contents
  }

  if (response.status === 401) {
    clearLocalData()
  }

  // if there's a key, the message must be derived
  if (contents.key) {
    contents.error = polyglot.t(contents.key)
  }

  // buffalo => `error`, gql => errors[0].message
  throwError(contents.error || contents.errors[0].message, response.status)
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

export async function login(email, returnTo) {
  token.reset()

  let loginUrl = `auth/login?client-id=${token.key()}&auth-email=${email}`

  if (returnTo) {
    loginUrl += `&return-to=${returnTo}`
  }

  try {
    const response = await wrappedFetch(loginUrl)

    window.location = response.RedirectURL
  } catch (e) {
    // TODO: need errorhandling and additional use cases with this response
    //   "Need to review response for error or multiple org 
    //    options for login. If multiple options you then also need to provide the org_id 
    //    when resubmitting call to login" –Phillip)
    throw e
  }
}

export function logout() {
  //TODO: clear user store (warning: don't create a circular dependency on user.js)
  window.location = `${process.env.BASE_API_URL}/auth/logout?token=${token.pair()}`

  token.reset()
}

export async function upload(formData) {
  return await wrappedFetch('upload', formData)
}

function clearLocalData() {
  token.reset()
  resetUser()
  resetMessaging()
  resetRequests()
}