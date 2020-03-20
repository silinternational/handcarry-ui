import { createWatch } from './gqlQueries'

export function create(name, filters) {
    createWatch(name, filters)
}
