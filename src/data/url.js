import qs from 'qs'

export function updateQueryString(updates) {
  const querystring = window.location.search
  let queryStringData = qs.parse(querystring, { ignoreQueryPrefix: true, strictNullHandling: true })

  for (const key in updates) {
    const value = updates[key]
    if (value === null) {
      // For mere present/absent parameters, we can use `null`, which causes `qs.stringify()` (if using
      // `strictNullHandling`) to omit the = sign and value.
      queryStringData[key] = null
    } else if (value) {
      queryStringData[key] = value
    } else if (queryStringData.hasOwnProperty(key)) {
      delete queryStringData[key]
    }
  }

  const newQueryString = qs.stringify(queryStringData, { strictNullHandling: true })
  const url = window.location.origin + window.location.pathname
  const newUrl = newQueryString ? `${url}?${newQueryString}` : url
  return newUrl
}
