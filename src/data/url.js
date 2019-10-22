import { push } from 'svelte-spa-router'
import qs from 'qs'

export function updateQueryString(queryString, updates) {
  let queryStringData = qs.parse(queryString)

  for (const key in updates) {
    const value = updates[key]
    if (value) {
      queryStringData[key] = value
    } else if (queryStringData.hasOwnProperty(key)) {
      delete queryStringData[key]
    }
  }

  const newQueryString = qs.stringify(queryStringData)
  newQueryString ? push(`/requests?${newQueryString}`) : push('/requests')
}
