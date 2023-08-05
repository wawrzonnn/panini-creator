import { vegetableVariant } from '../data/vegetable'
import { breadVariants } from '../data/bread'
import { cheeseVariants } from '../data/cheese'
import { meatVariants } from '../data/meat'
import { dressingVariants } from '../data/dressing'
import { eggVariants } from '../data/egg'
import { servingVariant } from '../data/serving'
import { toppingVariant } from '../data/topping'
import { spreadVariant } from '../data/spread'

export const randomizePanini = () => {
  const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  const getRandomVegetables = () => {
    const vegetables: string[] = []
    const numberOfVegetables = Math.floor(Math.random() * vegetableVariant.length)
    for (let i = 0; i < numberOfVegetables; i++) {
      const randomVeg = getRandomElement(vegetableVariant)
      if (!vegetables.includes(randomVeg)) {
        vegetables.push(randomVeg)
      }
    }
    return vegetables
  }

  const getRandomSpreads = () => {
    const spreads: string[] = []
    for (let i = 0; i < spreadVariant.length; i++) {
      if (Math.random() < 0.5) {
        spreads.push(spreadVariant[i])
      }
    }
    return spreads
  }

  return {
    base: {
      bread: getRandomElement(breadVariants),
      cheese: [getRandomElement(cheeseVariants)],
      meat: [getRandomElement(meatVariants)],
      dressing: [getRandomElement(dressingVariants)],
      vegetables: getRandomVegetables(),
    },
    extras: {
      egg: [getRandomElement(eggVariants)],
      spreads: getRandomSpreads(),
      serving: getRandomElement(servingVariant),
      topping: Math.random() < 0.5 ? toppingVariant[0] : null,
    },
    paniniName: '',
    cutlery: Math.random() < 0.5,
    napkins: Math.random() < 0.5,
  }
}
