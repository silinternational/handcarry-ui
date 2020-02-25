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
