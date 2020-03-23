import { createWatch } from './gqlQueries'
import {getActiveFilterKeys} from "./filtering";

export function create(name, filters) {
    createWatch(name, filters)
}

/**
 * Get the watchable and active filters for use in creating an watch
 *
 * @param {Object} filter
 * @returns {Object[]}
 */
export function getFiltersForWatch(filter) {
    const activeFilterKeys = getActiveFilterKeys(filter)
    const watchableKeys = getWatchableKeys(activeFilterKeys)

    let returnValues = []
    watchableKeys.forEach(key => returnValues.push(filter[key]))

    return returnValues
}

/**
 * Get only the watchable keys from a list of filter keys
 *
 * @param {string[]} filterKeys
 * @returns {string[]}
 */
export function getWatchableKeys(filterKeys) {
    return filterKeys.filter(key => ['destination','origin','event','search','size'].includes(key))
}
