import { gql } from './api'

export function geoLocation(ip) {
   return gql(`{
      getLocation(ip: "${ip}") {
        country {
          names {
            en
          }
          geoname_id
          iso_code
        }
        location {
          latitude
          longitude
        }
      }
    }`)
}
