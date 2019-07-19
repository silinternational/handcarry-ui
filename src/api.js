import token from './token.js';

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
export async function get(resource) {
  return await f(`http://handcarry.local:3000/${resource}`)
}

export async function gql(query) {
  const response = await f('http://handcarry.local:3000/gql', {
    method: 'post',
    body: JSON.stringify({
      query
    }),
  })

  return response.data
}

export function login(returnTo) {
  token.reset()

  let loginUrl = `http://handcarry.local:3000/auth/login?client_id=${token.key()}`

  if (returnTo) {
    loginUrl += `&ReturnTo=${returnTo}`
  }

  window.location = loginUrl
}

const headers = {
  'content-type': 'application/json',
  Authorization: token.authzHeader(),
}

async function f(url, config = {}) {
  config.headers = headers
  
  const response = await fetch(url, config)
  // TODO: check response is ok before assuming anything (https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)

  // 401/403 => login
  // ! ok => throw
  
  return response.json()
}
