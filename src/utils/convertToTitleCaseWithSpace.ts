export const convertToTitleCaseWithSpace = (variants: string[]): string[] => {
  return variants.map((item) => item.replace(/_/g, ' '))
}
