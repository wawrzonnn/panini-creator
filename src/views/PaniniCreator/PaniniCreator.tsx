import React, { useState } from 'react'
import styles from './PaniniCreator.module.scss'

import { motion } from 'framer-motion'

import ConfigureBase from '../../form/ConfigureBase/ConfigureBase'
import ConfigureExtras from '../../form/ConfigureExtras/ConfigureExtras'
import FinalizeOrder from '../../form/FinalizeOrder/FinalizeOrder'

interface PaniniCreatorProps {
  onPlaceOrder: () => void
}

const PaniniCreator = ({ onPlaceOrder }: PaniniCreatorProps) => {
  const [isExiting, setIsExiting] = useState(false)

  const handlePlaceOrder = () => {
    setIsExiting(true)
    setTimeout(onPlaceOrder, 1000)
  }

  return (
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
  )
}

export default PaniniCreator
