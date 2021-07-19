import { DELETE, GET, locationForApi, POST } from './api'
import { getActiveFilterKeys } from './filtering'

export async function create(name, filters) {
  const requestBody = {
    name,
    destination: locationForApi(filters.destination.value),
    origin: locationForApi(filters.origin.value),
    meeting_id: filters.event.value,
    search_text: filters.requestSearch.value,
    size: filters.size.value?.toUpperCase(),
  }
  await POST('watches', requestBody)
}

/**
 * Get the watchable and active filters for use in creating a watch
 *
 * @param {Object} filter
 * @returns {Object[]}
 */
export function getFiltersForWatch(filter) {
    return getActiveFilterKeys(filter).filter(isWatchable).map(key => filter[key])
}

const watchableKeys = ['destination', 'origin', 'event', 'requestSearch', 'size']
const isWatchable = filterKey => watchableKeys.includes(filterKey)

/**
 * Get only the watchable keys from a list of filter keys
 *
 * @param {string[]} filterKeys
 * @returns {string[]}
 */
export function getWatchableKeys(filterKeys) {
    return filterKeys.filter(key => watchableKeys.includes(key))
}

export const getWatches = async () => await GET('watches')
export const deleteWatch = async id => await DELETE(`watches/${id}`)
