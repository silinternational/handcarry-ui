import token from './token';
// TODO: image upload research:
//  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
//  https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript#Using_XMLHttpRequest_and_the_FormData_object
//  https://stackoverflow.com/questions/35192841/fetch-post-with-multipart-form-data
//
const BASE_API_URL = '<@BASE_API_URL@>'

export async function gql(query) {
  const response = await wrappedFetch('gql', {
    body: JSON.stringify({
      query
    }),
  })

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

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
async function wrappedFetch(url, config = {}) {
  config.headers = {
    'content-type': 'application/json',
    authorization: token.authzHeader(),
  }
  
  config.method = 'post'
  config.credentials = 'include' // ensures the response back from the api will be allowed to "set-cookie"
  
  const response = await fetch(`${BASE_API_URL}/${url}`, config)
  // TODO: check response is ok before assuming anything (https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)

  // 401/403 => login?
  // ! ok => throw
  
  return response.json()
}
