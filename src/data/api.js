import token from './token';

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
async function wrappedFetch(url, body) {
  const headers = {
    authorization: token.authzHeader(),
  }

  // boundary information was missing when setting content-type to 'multipart/form-data` so 
  // the content-type should not be set at all so the browser can set the request up appropriately
  // when dealing with FormData, i.e., when uploading files
  if (!(body instanceof FormData)) {
    headers['content-type'] = 'application/json'
  }

  const response = await fetch(`${process.env.BASE_API_URL}/${url}`, {
    method: 'post',
    credentials: 'include', // ensures the response back from the api will be allowed to "set-cookie"
    headers,
    body,
  })
  // TODO: check response is ok before assuming anything (https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)

  // 401/403 => login?
  // ! ok => throw
  
  return await response.json()
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

  const response = await wrappedFetch(loginUrl)

// TODO: need errorhandling and additional use cases with this response
//   "You can also post to login. Need to review response for error or multiple org 
//    options for login. If multiple options you then also need to provide the org_id 
//    when resubmitting call to login" –Phillip)
  window.location = response.RedirectURL
}

export const logoutUrl = `${process.env.BASE_API_URL}/auth/logout?token=${token.pair()}`

export async function upload(formData) {
  return await wrappedFetch('upload', formData)
}
