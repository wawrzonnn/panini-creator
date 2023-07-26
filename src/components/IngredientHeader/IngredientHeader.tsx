import React, { PropsWithChildren } from 'react'
import styles from './IngredientHeader.module.scss'

export const IngredientHeader = ({ children }: PropsWithChildren) => {
  return <span className={styles.title}>{children}</span>
}

export default IngredientHeader
