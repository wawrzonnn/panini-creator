export type FormData = {
    base: {
      bread: string
      cheese: string[]
      meat: string[]
      dressing: string[]
      vegetables: string[]
    }
    extras: {
      egg: string[]
      spreads: string[]
      serving: string
      topping: null | string
    }
    paniniName: string
    cutlery: boolean
    napkins: boolean
  }