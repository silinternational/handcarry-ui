import { location, push, querystring } from 'svelte-spa-router'
import { get } from 'svelte/store'
import qs from 'qs'

export function updateQueryString(updates) {
  let queryStringData = qs.parse(get(querystring))

  for (const key in updates) {
    const value = updates[key]
    if (value) {
      queryStringData[key] = value
    } else if (queryStringData.hasOwnProperty(key)) {
      delete queryStringData[key]
    }
  }

  const newQueryString = qs.stringify(queryStringData)
  newQueryString ? push(get(location) + '?' + newQueryString) : push(get(location))
}
