
export function describeVisibility(value, organizations) {
  const organizationNames = organizations.map(org => org.name).join(' and ') || 'my organization'
  const descriptions = {
    SAME: `Only members of ${organizationNames}`,
    TRUSTED: `Only members of ${organizationNames} and affiliated organizations`,
    ALL: `All WeCarry users`
  }
  return descriptions[value] || ''
}

export const values = ['SAME', 'TRUSTED', 'ALL']
