// color representations taken from bootstrap classes
export const sizes =  [
  {
    name: 'tiny',
    type: 'TINY',
    pictureUrl: '/icons/envelope.svg',
    genericGraphicUrl: '/icons/envelope-generic.svg',
    color: '#67ae09',
    description: 'Fits in a purse'
  },
  {
    name: 'small',
    type: 'SMALL',
    pictureUrl: '/icons/book.svg',
    genericGraphicUrl: '/icons/book-generic.svg',
    color: '#0d98aa',
    description: 'Fits in a carry-on bag'
  },
  {
    name: 'medium',
    type: 'MEDIUM',
    pictureUrl: '/icons/laptop.svg',
    genericGraphicUrl: '/icons/laptop-generic.svg',
    color: '#ff731b',
    description: 'Fits in a backpack'
  },
  {
    name: 'large',
    type: 'LARGE',
    pictureUrl: '/icons/tools.svg',
    genericGraphicUrl: '/icons/tools-generic.svg',
    color: '#e0221f',
    description: 'Fits in a suitcase'
  },
  {
    name: 'xlarge',
    type: 'XLARGE',
    pictureUrl: '/icons/question-mark.svg',
    genericGraphicUrl: '/icons/question-mark-generic.svg',
    color: '#292923',
    description: 'Is bigger than that...'
  },
]

export function getSelectedSizes(selectedSizeType) {
  const upperCaseSize = String(selectedSizeType).toUpperCase()
  switch (upperCaseSize) {
    case 'TINY': return ['TINY']
    case 'SMALL': return ['TINY', 'SMALL']
    case 'MEDIUM': return ['TINY', 'SMALL', 'MEDIUM']
    case 'LARGE': return ['TINY', 'SMALL', 'MEDIUM', 'LARGE']
    default: return ['TINY', 'SMALL', 'MEDIUM', 'LARGE', 'XLARGE']
  }
}

export function includedInSizeSelection(sizeType, selectedSizeType) {
  let selectedSizes = getSelectedSizes(selectedSizeType)
  return (selectedSizes.indexOf(sizeType) >= 0)
}

export function isDefaultSizeFilter(lowerCaseSize) {
  return lowerCaseSize === 'xlarge'
}
