import React from 'react'
import styles from './Add.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

interface AddProps {
  onClick?: () => void
  className?: string
}

export const Add = ({ onClick, className }: AddProps) => {

  return (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" className={styles.addIcon}>
      <rect x="0.25" y="0.25" width="16.5" height="16.5" rx="8.25" stroke="black" stroke-width="0.5" />
      <line x1="8.75" y1="4.5" x2="8.75" y2="12.5" stroke="black" stroke-width="0.5" />
      <line x1="4.5" y1="8.25" x2="12.5" y2="8.25" stroke="black" stroke-width="0.5" />
    </svg>
  )
}

export default Add