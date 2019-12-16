import token from './token'
import { push } from 'svelte-spa-router'

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
async function wrappedFetch(url, body) {
  const headers = {
    authorization: token.authzHeader(),
    'content-type': 'application/json',
  }

  // when dealing with FormData, i.e., when uploading files, allow the browser to set the request up properly
  // so boundary information is included correctly.
  if (body instanceof FormData) {
    delete headers['content-type']
  }

  const response = await fetch(`${process.env.BASE_API_URL}/${url}`, {
    method: 'post',
    credentials: 'include', // ensures the response back from the api will be allowed to "set-cookie"
    headers,
    body,
  })
    
  if (response.status === 401) {
    push('/login')
  }
  // TODO: need to think through errorhandling here since there can be "ok"
  // responses from gql that are actually errors and there can be "! ok" 
  // responses form gql, e.g., 422... (it may require a custom error type to house
  //     the details of the error as properties)
  // 
  //  we should probably work with backend to ensure no error responses are 200's
  // if (response.ok) {
  return await response.json()
  // }
  //
  // return throw (something)
}

export async function gql(query) {
  const body = JSON.stringify({
    query
  })
  
  const response = await wrappedFetch('gql', body)
  if (response.errors !== undefined) {
    throw new Error(response.errors[0].message)
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
  } catch (error) {
    // TODO: need errorhandling and additional use cases with this response
    //   "Need to review response for error or multiple org 
    //    options for login. If multiple options you then also need to provide the org_id 
    //    when resubmitting call to login" –Phillip)
  }

}

export const logoutUrl = `${process.env.BASE_API_URL}/auth/logout?token=${token.pair()}`

export async function upload(formData) {
  return await wrappedFetch('upload', formData)
}
