import {getActiveFilterKeys} from "./filtering";

/**
 * Get the alertable and active filters for use in creating an alert
 *
 * @param {Object} filter
 * @returns {Object[]}
 */
export function getFiltersForAlert(filter) {
    const activeFilterKeys = getActiveFilterKeys(filter)
    const alertableKeys = getAlertableKeys(activeFilterKeys)

    let returnValues = []
    alertableKeys.forEach(key => returnValues.push(filter[key]))

    return returnValues
}

/**
 * Get only the alertable keys from a list of filter keys
 *
 * @param {string[]} filterKeys
 * @returns {string[]}
 */
export function getAlertableKeys(filterKeys) {
    return filterKeys.filter(key => ['destination','origin','event','search','size'].includes(key))
}
