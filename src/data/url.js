import { location, push, querystring } from 'svelte-spa-router'
import { get } from 'svelte/store'
import qs from 'qs'

export function updateQueryString(updates) {
  let queryStringData = qs.parse(get(querystring), { strictNullHandling: true })

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
  newQueryString ? push(get(location) + '?' + newQueryString) : push(get(location))
}
