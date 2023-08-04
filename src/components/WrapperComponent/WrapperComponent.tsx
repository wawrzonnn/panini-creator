import React from 'react'
import styles from './WrapperComponent.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

import { DropdownSelect } from '../DropdownSelect/DropdownSelect'
import { CarouselSelect } from '../CarouselSelect/CarouselSelect'
import { Add } from '../../assets/icons/Add/Add'

export type WrapperType = 'dropdown' | 'carousel'

interface WrapperComponentProps {
  items: string[]
  addExtraIngredient: () => void
  onSelect: (selectedItem: string) => void
  type: WrapperType
}

export const WrapperComponent = ({ items, addExtraIngredient, onSelect, type }: WrapperComponentProps) => {
  const getWrapperComponentClasses = cx({
    [styles.wrapper]: true,
    [styles.carousel]: type === 'carousel',
  })

  return (
    <div className={getWrapperComponentClasses}>
      <Add onClick={addExtraIngredient} />
      {type === 'dropdown' ? (
        <DropdownSelect items={items} onSelect={onSelect} />
      ) : (
        <CarouselSelect items={items} onSelect={onSelect} />
      )}
    </div>
  )
}

export default WrapperComponent