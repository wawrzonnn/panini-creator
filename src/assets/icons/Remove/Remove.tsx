import React from 'react'
import styles from './Remove.module.scss'

interface RemoveProps {
  onClick?: () => void
}
export const Remove = ({ onClick }: RemoveProps) => {
  return (
    <div className={styles.circle} onClick={onClick}>
      <span className={styles.minus}>_</span>
    </div>
  )
}

export default Remove
