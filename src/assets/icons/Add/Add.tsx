import React from 'react'
import styles from './Add.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

interface AddProps {
  onClick?: () => void
  disabled?: boolean
}

export const Add = ({ onClick, disabled }: AddProps) => {
  const getAddIconClasses = cx({
    [styles.circle]: true,
    [styles.disabled]: disabled,
  })
  return (
    <div className={getAddIconClasses} onClick={disabled ? undefined : onClick}>
      <span className={styles.plus}>+</span>
    </div>
  )
}

export default Add
