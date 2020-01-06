import token from './token'
import { throwError } from './error'
import polyglot from '../i18n'

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
  //   { code, error, trace } or { code, key }
  //   the message to display will either be in { error } or it will need to be derived from { key }, i.e., 
  //   { key } is intended for looking up the appropriate message

  if (contents.errors) { 
    // must be a gql "bad" response
    throwError(contents.errors[0].message, response.status)
  }

  // gql "bad" 200's are out of the picture now, this should be all good, we're finished
  if (response.ok) { 
    return contents
  }

  if (response.status === 401) {
    //TODO: clear user store without creating a circular dependency on user.js
    token.reset() // just in case they already have local credentials, "expire" them
  }

  // if there's a key, the message must be derived
  if (contents.key) {
    contents.error = polyglot.t(contents.key)
  }

  throwError(contents.error, response.status)
}

export async function gql(query) {
  const body = JSON.stringify({
    query
  })
  
  const { data } = await wrappedFetch('gql', body)
   
  return data
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
