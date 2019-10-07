// color representations taken from bootstrap classes
export const sizes =  [
  {
    name: 'tiny',
    pictureUrl: '/icons/envelope.svg',
    color: 'success',
    description: 'Fits in a purse'
  },
  {
    name: 'small',
    pictureUrl: '/icons/book.svg',
    color: 'info',
    description: 'Fits in a carry-on bag'
  },
  {
    name: 'medium',
    pictureUrl: '/icons/laptop.svg',
    color: 'warning',
    description: 'Fits in a backpack'
  },
  {
    name: 'large',
    pictureUrl: '/icons/tools.svg',
    color: 'danger',
    description: 'Fits in a suitcase'
  },
  {
    name: 'xlarge',
    pictureUrl: '/icons/question-mark.svg',
    color: 'dark',
    description: 'Is bigger than that...'
  },
]

export function getSelectedSizes(selectedSizeName) {
  switch (selectedSizeName) {
    case 'tiny': return ['tiny']
    case 'small': return ['tiny', 'small']
    case 'medium': return ['tiny', 'small', 'medium']
    case 'large': return ['tiny', 'small', 'medium', 'large']
    case 'xlarge': return ['tiny', 'small', 'medium', 'large', 'xlarge']
    default: return []
  }
}

export function includedInSizeSelection(sizeName, selectedSizeName) {
  let selectedSizes = getSelectedSizes(selectedSizeName)
  return (selectedSizes.indexOf(String(sizeName).toLowerCase()) >= 0)
}
