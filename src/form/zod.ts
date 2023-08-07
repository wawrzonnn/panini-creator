import { z } from 'zod';

export const sandwichSchema = z.object({
  paniniName: z.string().max(35).optional(),  
  cutlery: z.boolean().optional(),
  napkins: z.boolean().optional(),
  base: z.object({
    bread: z.union([z.literal("FULL GRAIN"), z.literal("WHEAT")]).optional(),
    cheese: z.array(z.union([z.literal("MOZZARELLA"), z.literal("STRACIATELLA"), z.literal("EDAM"), z.literal("GOUDA")])).optional(),
    meat: z.array(z.union([z.literal("SALAMI"), z.literal("HAM"), z.literal("BACON"), z.literal("CHICKEN")])).optional(),
    dressing: z.array(z.union([z.literal("OLIVE OIL"), z.literal("HONEY_MUSTARD"), z.literal("RANCH"), z.literal("MAYO")])).optional(),
    vegetables: z.array(z.union([z.literal("SALAD"), z.literal("TOMATO"), z.literal("OBERGINE"), z.literal("BEETROOT"), z.literal("PICKLES"), z.literal("ONION"), z.literal("PEPPER"), z.literal("ASPARAGUS"), z.literal("CUCUMBER")])).optional(),
  }).optional(),
  extras: z.object({
    egg: z.array(z.union([z.literal("FRIED EGG"), z.literal("OMELET"), z.literal("SCRAMBLED EGG")])).optional(),
    spreads: z.array(z.union([z.literal("BUTTER"), z.literal("HUMMUS"), z.literal("GUACAMOLE")])).optional(),
    serving: z.union([z.literal("COLD"), z.literal("WARM"), z.literal("GRILLED")]).optional(),
    topping: z.union([z.literal("SESAME"), z.literal(null)]).optional(),
  }).optional(),
});