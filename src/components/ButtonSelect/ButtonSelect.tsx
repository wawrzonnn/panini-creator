import * as React from 'react'

import styles from './ButtonSelect.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

interface ButtonSelectProps {
  item: string
  onClick: (item: string) => void
  selected: boolean
}

export const ButtonSelect = ({ item, onClick, selected }: ButtonSelectProps) => {
  const handleClick = () => {
    onClick(item)
  }

  const getButtonClasses = cx({
    [styles.default]: true,
    [styles.selected]: selected,
  })

  return (
    <button onClick={handleClick} type="button" className={getButtonClasses}>
      {item}
    </button>
  )
}

export default ButtonSelect
