import React, { PropsWithChildren } from 'react'
import styles from './IngredientHeader.module.scss'

export const IngredientHeader = ({ children }: PropsWithChildren) => {
  return <p className={styles.title}>{children}</p>
}

export default IngredientHeader
