// color representations taken from bootstrap classes
export const sizes =  [
  {
    name: 'tiny',
    type: 'TINY',
    pictureUrl: '/icons/envelope.svg',
    genericGraphicUrl: '/icons/generic-envelope.svg',
    color: 'success',
    description: 'Fits in a purse'
  },
  {
    name: 'small',
    type: 'SMALL',
    pictureUrl: '/icons/book.svg',
    genericGraphicUrl: '/icons/generic-book.svg',
    color: 'info',
    description: 'Fits in a carry-on bag'
  },
  {
    name: 'medium',
    type: 'MEDIUM',
    pictureUrl: '/icons/laptop.svg',
    genericGraphicUrl: '/icons/generic-laptop.svg',
    color: 'warning',
    description: 'Fits in a backpack'
  },
  {
    name: 'large',
    type: 'LARGE',
    pictureUrl: '/icons/tools.svg',
    genericGraphicUrl: '/icons/generic-tools.svg',
    color: 'danger',
    description: 'Fits in a suitcase'
  },
  {
    name: 'xlarge',
    type: 'XLARGE',
    pictureUrl: '/icons/question-mark.svg',
    genericGraphicUrl: '/icons/generic-question-mark.svg',
    color: 'dark',
    description: 'Is bigger than that...'
  },
]

function getSelectedSizes(selectedSizeName) {
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
