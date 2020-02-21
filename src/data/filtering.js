/**
 * Filter the given array of items based on the given filter data. If the
 * filter data has a `search` property, the results will also be filtered by
 * whether the given `matchesSearchText(item, searchText)` function returns
 * true for the item.
 *
 * @param {Object[]} items
 * @param {Object} filter
 * @param {function(Object, string): boolean} matchesSearchText
 * @returns {Array} - The items that match the filter/search criteria.
 */
export function filterItems(items, filter, matchesSearchText) {
  let results = items.slice(0); // Shallow-clone the array quickly.
  const itemFilter = Object.assign({}, filter)
  
  const searchText = itemFilter.search
  delete itemFilter.search

  for (const property in itemFilter) {
    results = results.filter(item => matchesProperty(item, itemFilter, property))
  }

  if (searchText) {
    results = results.filter(item => matchesSearchText(item, searchText))
  }

  return results
}

function matchesProperty(item, itemFilter, property) {
  if (!itemFilter[property]) {
    return true
  }

  if (!item) {
    return false
  }

  if (Array.isArray(itemFilter[property])) {
    return (itemFilter[property].indexOf(item[property]) >= 0)
  } else if (typeof itemFilter[property] === 'object') {
    for (const subProperty in itemFilter[property]) {
      if (!matchesProperty(item[property], itemFilter[property], subProperty)) {
        return false
      }
    }
    return true
  }
  return stringIsIn(itemFilter[property], item[property])
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
