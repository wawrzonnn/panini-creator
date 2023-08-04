import React, { useState } from 'react'
import styles from './PaniniCreator.module.scss'
import { useForm, FormProvider } from 'react-hook-form'
import { motion } from 'framer-motion'

import { FormData } from '../../form/types'

import ConfigureBase from '../../form/ConfigureBase/ConfigureBase'
import ConfigureExtras from '../../form/ConfigureExtras/ConfigureExtras'
import FinalizeOrder from '../../form/FinalizeOrder/FinalizeOrder'

import { breadVariants } from '../../data/bread'
import { cheeseVariants } from '../../data/cheese'
import { meatVariants } from '../../data/meat'
import { dressingVariants } from '../../data/dressing'
import { eggVariants } from '../../data/egg'

interface PaniniCreatorProps {
  onPlaceOrder: () => void
}

const PaniniCreator = ({ onPlaceOrder }: PaniniCreatorProps) => {
  const methods = useForm<FormData>({
    defaultValues: {
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
        serving: '',
        topping: null,
      },
      paniniName: '',
      cutlery: true,
      napkins: true,
    },
  })

  const [isExiting, setIsExiting] = useState(false)

  const handlePlaceOrder = () => {
    setIsExiting(true)
    setTimeout(onPlaceOrder, 1000)
  }

  return (
    <FormProvider {...methods}>
        <motion.div
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ConfigureBase />
          <ConfigureExtras />
          <FinalizeOrder onPlaceOrder={handlePlaceOrder} />
        </motion.div>
    </FormProvider>
  )
}

export default PaniniCreator
