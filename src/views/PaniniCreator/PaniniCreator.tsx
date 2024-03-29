import React, { useState } from 'react'
import styles from './PaniniCreator.module.scss'
import { useForm, FormProvider } from 'react-hook-form'
import { motion } from 'framer-motion'
import { sandwichSchema } from '../../form/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';

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
  onPlaceOrder: () => void;
}

const PaniniCreator = ({ onPlaceOrder }: PaniniCreatorProps) => {

  const methods = useForm<FormData>({
    resolver: zodResolver(sandwichSchema),
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
        serving: 'GRILLED',
        topping: null,
      },
      paniniName: '',
      cutlery: true,
      napkins: true,
    },
  })
  const {
    formState: { errors },
  } = methods
  const [isExiting, setIsExiting] = useState(false)

  const navigate = useNavigate()

  const onSubmit = (data: FormData) => {
    if (Object.keys(errors).length === 0) {
      console.log('Success, Form Data:', data)   
      setIsExiting(true);       
      setTimeout(() => {
        onPlaceOrder();
        navigate('/');
    }, 2000);
    } else {
      console.log('Error');
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <motion.div
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <ConfigureBase />
          <ConfigureExtras />
          <FinalizeOrder />
        </motion.div>
      </form>
    </FormProvider>
  )
}

export default PaniniCreator
