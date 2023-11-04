import React, { useState } from 'react'

import styles from './CarouselSelect.module.scss'

import { ArrowLeft } from '../../assets/icons/ArrowLeft'
import { ArrowRight } from '../../assets/icons/ArrowRight'

interface CarouselSelectProps {
  items: string[]
  onSelect: (selectedItem: string) => void
  selectedItem?: string
  icon?: React.ReactNode
  className?: string
}

export const CarouselSelect = ({
  items,
  onSelect,
  icon,
  selectedItem: controlledSelectedItem,
  className,
}: CarouselSelectProps) => {
  const [localSelectedItem, setLocalSelectedItem] = useState(items[0])
  const selectedItem = controlledSelectedItem ?? localSelectedItem

  const handleNext = () => {
    const currentIndex = items.indexOf(selectedItem)
    const nextIndex = (currentIndex + 1) % items.length
    const nextItem = items[nextIndex]
    setLocalSelectedItem(nextItem)
    onSelect(nextItem)
  }

  const handlePrev = () => {
    const currentIndex = items.indexOf(selectedItem)
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
    const prevItem = items[prevIndex]
    setLocalSelectedItem(prevItem)
    onSelect(prevItem)
  }

  return (
    <div className={className}>
      <div className={styles.wrapper}>
        <button type="button" onClick={handlePrev}>
          <ArrowLeft />
        </button>
        <span className={styles.icon_wrapper}>
          {icon}
          {selectedItem}
        </span>
        <button type="button" onClick={handleNext}>
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}
