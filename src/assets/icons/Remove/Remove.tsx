import React from 'react'
import styles from './Remove.module.scss'

interface RemoveProps {
  onClick?: () => void
  className?: string
}
export const Remove = ({ onClick, className }: RemoveProps) => {
  return (
    <svg onClick={onClick} className={styles.removeIcon} xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <rect x="0.25" y="0.25" width="16.5" height="16.5" rx="8.25" stroke="black" strokeWidth="0.5"/>
    <line x1="4.5" y1="8.25" x2="12.5" y2="8.25" stroke="black" strokeWidth="0.5"/>
  </svg>
  )
}

export default Remove
