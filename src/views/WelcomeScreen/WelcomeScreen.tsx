import React, { useState } from 'react'
import { motion } from 'framer-motion'

import styles from './WelcomeScreen.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

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
const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [startAnimation, setStartAnimation] = useState(false)

  const handleClick = () => {
    setStartAnimation(true)
    setTimeout(onStart, 4000)
  }
  const getHeaderClasses = cx({
    [styles.header]: true,
    [styles.hidden__border]: startAnimation,
  })

  return (
    <div className={styles.container}>
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
        <motion.span>Panini Creator</motion.span>
        <motion.button className={styles.button} onClick={handleClick}>
          BEGIN
        </motion.button>
      </motion.div>
    </div>
  )
}

export default WelcomeScreen
