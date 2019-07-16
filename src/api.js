// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
export async function get(url) {
  const res = await fetch('https://httpbin.org/get')
  return await res.json()
}

export async function gql() {
  const q = `{
    getLocation(ip: "8.8.8.8") {
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
  
  const res = await fetch("https://api.graphloc.com/graphql", {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: q
    }),
  })

  return await res.json()
}
