import { updateQueryString } from './url'

/**
 * Filter the given array of items based on the given filters.
 *
 * @param {Object[]} items
 * @param {Object} filters
 * @returns {Array} - The items that match the criteria of any active filters.
 */
export function filterItems(items, filters) {
  let results = items.slice(0); // Shallow-clone the array quickly.

  Object.values(filters).filter(isActive).forEach(filter => {
    results = results.filter(filter.isMatch)
  })

  return results
}

/**
 * Whether the given object of filter data indicates that the filter is active.
 *
 * @param {Object} filter
 * @returns {boolean}
 */
export function isActive(filter) {
  return filter.active
}


/**
 * Get a list of the active filter keys.
 *
 * @param {Object} filter
 * @returns {string[]}
 */
export function getActiveFilterKeys(filter) {
  const filterKeys = Object.keys(filter)
  return filterKeys.filter(key => filter[key].active)
}

/**
 * See if the given item is in the given list of items (by comparing `id` values).
 *
 * @param {Object} item
 * @param {Object[]} items
 * @returns {boolean}
 */
export function isItemInList(item, items) {
  return items.some(({ id }) => id === item.id)
}

/**
 * Remove the named filter from the query string.
 *
 * @param {string} name
 */
export function removeFilter(name) {
  const updates = {}
  if (name === 'destination'){
    updates['toDescription'] = false
    updates['toCountry'] = false
    updates['toLatitude'] = false
    updates['toLongitude'] = false
  } else if  (name === 'origin'){
    updates['fromDescription'] = false
    updates['fromCountry'] = false
    updates['fromLatitude'] = false
    updates['fromLongitude'] = false
  } else {
    updates[name] = false
  }
  updateQueryString(updates)
}

/**
 * Update the query string with the given filter keys/values.
 *
 * Example:
 * `setFilters({ size: 'tiny' })`
 *
 * To remove some other filter(s) at the same time, send `false` for the filter(s) to be removed.
 *
 * Example:
 * ```
 * setFilters({
 *   creator: $me.id,
 *   provider: false,
 * })
 * ```
 *
 * To add a parameter with no value (simply using its presence/absence as a sort of toggle), send `null`.
 *
 * Example:
 * ```
 * setFilters({ participant: null })
 * ```
 *
 * @param {Object} updates
 */
export function setFilters(updates) {
  updateQueryString(updates)
}

/**
 * Whether the given needle (string) is in the given haystack (string).
 * Does a case-insensitive comparison.
 *
 * @param {string} needle
 * @param {string} haystack
 * @returns {boolean}
 */
export function stringIsIn(needle, haystack) {
  return (haystack || '').toLowerCase().indexOf(String(needle).toLowerCase()) >= 0
}

/**
 * Whether two locations are within 100 km each other. This should always be the same as
 * the calculation in wecarry-api.
 * 
 * @param {Object} loc1
 * @param {Object} loc2
 * @return {boolean}
 */
export function near(loc1, loc2) {
  return !loc1 || !loc2 || distance(loc1.latitude, loc1.longitude, loc2.latitude, loc2.longitude) < 100
}

/**
 * Haversine formula implementation derived from Stack Overflow answer:
 * https://stackoverflow.com/a/21623206

 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 */
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
