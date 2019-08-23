import token from './token.js';

export async function gql(query) {
  const response = await wrappedFetch('<@BASE_API_URL@>/gql', {
    method: 'post',
    body: JSON.stringify({
      query
    }),
  })

  return response.data
}

export async function login(email, returnTo) {
  token.reset()

  let loginUrl = `auth/login?client_id=${token.key()}&authEmail=${email}`

  if (returnTo) {
    loginUrl += `&ReturnTo=${returnTo}`
  }

  const response = await get(loginUrl)

// TODO: need errorhandling and additional use cases with this response
//   "You can also post to login. Need to review response for error or multiple org 
//    options for login. If multiple options you then also need to provide the org_id 
//    when resubmitting call to login" –Phillip)
  window.location = response.RedirectURL
}

export async function logout() {
  return await get(`auth/logout`)  
}

async function get(resource) {
  return await wrappedFetch(`<@BASE_API_URL@>/${resource}`)
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
async function wrappedFetch(url, config = {}) {
  config.headers = {
    'content-type': 'application/json',
    Authorization: token.authzHeader(),
  }
  
  config.credentials = 'include'
  
  const response = await fetch(url, config)
  // TODO: check response is ok before assuming anything (https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)

  // 401/403 => login?
  // ! ok => throw
  
  return response.json()
}
