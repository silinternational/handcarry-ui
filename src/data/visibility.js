const myOrganization = 'my organization'

const descriptions = {
  SAME: `Only members of ${myOrganization}`,
  TRUSTED: `Only members of ${myOrganization} and affiliated organizations`,
  ALL: `All WeCarry users`
}

export function describeVisibility(value, organizations) {
  const organizationNames = organizations.map(org => org.name).join(' and ') || myOrganization
  const description = descriptions[value] || ''
  return description.replace(myOrganization, organizationNames)
}

export const values = Object.getOwnPropertyNames(descriptions)
