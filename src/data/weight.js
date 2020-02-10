const kilogramsPerPound = 0.45359237

export function kilogramsToPounds(kgs) {
  return kgs / kilogramsPerPound
}

export function poundsToKilograms(lbs) {
  return lbs * kilogramsPerPound
}