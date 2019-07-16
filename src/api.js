import './token.js'
import token from './token.js';

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
export async function get() {
  return await f('https://httpbin.org/get')
}

export async function gql() {
  return await f('https://api.graphloc.com/graphql', {
    method: 'post',
    body: JSON.stringify({
      query: query.geoLocation('8.8.8.8')
    }),
  })
}

const headers = {
  'content-type': 'application/json',
  Authorization: token.authzHeader(),
}

async function f(url, config = {}) {
  config.headers = headers
  
  const response = await fetch(url, config)
  // TODO: check response is ok before assuming anything (https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
  return response.json()
}

const query = {
  geoLocation: ip => `{
    getLocation(ip: "${ip}") {
      country {
        names {
          en
        }
        geoname_id
        iso_code
      }
      location {
        latitude
        longitude
      }
    }
  }`
}
