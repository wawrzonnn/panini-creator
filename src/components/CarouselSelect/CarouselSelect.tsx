import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import styles from './CarouselSelect.module.scss'

import { ArrowLeft } from '../../assets/icons/ArrowLeft'
import { ArrowRight } from '../../assets/icons/ArrowRight'

interface CarouselSelectProps {
  items: string[]
  onSelect: (selectedItem: string) => void
  icon?: React.ReactNode
}

export const CarouselSelect = ({ items, onSelect, icon }: CarouselSelectProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
      onSelect(items[currentIndex + 1])
    } else {
      setCurrentIndex(0)
      onSelect(items[0])
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      onSelect(items[currentIndex - 1])
    } else {
      setCurrentIndex(items.length - 1)
      onSelect(items[items.length - 1])
    }
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={handlePrev}>
        <ArrowLeft />
      </button>
      <span>
        {icon}
        {items[currentIndex]}
      </span>
      <button type="button" onClick={handleNext}>
        <ArrowRight />
      </button>
    </div>
  )
}
