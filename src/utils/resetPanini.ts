import { vegetableVariant } from '../data/vegetable'
import { breadVariants } from '../data/bread'
import { cheeseVariants } from '../data/cheese'
import { meatVariants } from '../data/meat'
import { dressingVariants } from '../data/dressing'
import { eggVariants } from '../data/egg'


export const resetPanini = () => {
  return {
    base: {
      base: {
        bread: breadVariants[0],
        cheese: [cheeseVariants[0]],
        meat: [meatVariants[0]],
        dressing: [dressingVariants[0]],
        vegetables: [],
      },
      extras: {
        egg: [eggVariants[0]],
        spreads: [],
        serving: 'GRILLED',
        topping: null,
      },
      paniniName: '',
      cutlery: true,
      napkins: true,
    },
  }
}
