import { createWatch, getMyWatches, removeWatch } from './gqlQueries'
import { getActiveFilterKeys } from './filtering'

export async function create(name, filters) {
    await createWatch(name, filters)
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

export const getWatches = async () => await getMyWatches()
export const deleteWatch = async id => await removeWatch(id)