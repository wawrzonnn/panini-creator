import React, { useState } from 'react'
import { motion } from 'framer-motion'

import styles from './SplashScreen.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

interface SplashScreenProps {
  onStart: () => void
  isOrderPlaced: boolean
}
import { fadeLeft, fadeRight, fadeDown, fadeUp } from '../../animations/welcomeScreenAnimations'
const animationMap = [
  { class: styles.circle__up, variant: fadeUp },
  { class: styles.circle__left, variant: fadeLeft },
  { class: styles.circle__leftinner, variant: fadeLeft },
  { class: styles.halfCircle__left, variant: fadeLeft },
  { class: styles.halfCircle__right, variant: fadeRight },
  { class: styles.circle__rightinner, variant: fadeRight },
  { class: styles.circle__right, variant: fadeRight },
  { class: styles.circle__down, variant: fadeDown },
]
const SplashScreen = ({ onStart, isOrderPlaced }: SplashScreenProps) => {
  const [startAnimation, setStartAnimation] = useState(false)

  const handleClick = () => {
    setStartAnimation(true)
    setTimeout(onStart, 4000)
  }
  const getHeaderClasses = cx({
    [styles.header]: true,
    [styles.hidden__border]: startAnimation,
  })
  const getButtonClasses = cx({
    [styles.button]: true,
    [styles.button_start_again]: isOrderPlaced
  })

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {animationMap.map((item, index) => (
        <motion.div
          key={index}
          className={item.class}
          animate={startAnimation ? 'visible' : 'hidden'}
          variants={item.variant}
        ></motion.div>
      ))}
      <motion.div
        className={getHeaderClasses}
        animate={startAnimation ? { opacity: 0, transition: { delay: 1, duration: 3 } } : { opacity: 1 }}
      >
        <motion.span>{isOrderPlaced ? 'Panini ordered' : 'Panini Creator'}</motion.span>
        <motion.button className={getButtonClasses} onClick={handleClick}>
          {isOrderPlaced ? 'START AGAIN' : 'BEGIN'}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
export default SplashScreen
