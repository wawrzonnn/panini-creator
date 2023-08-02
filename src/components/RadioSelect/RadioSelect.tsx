import * as React from 'react'
import { useEffect, useState } from 'react'

import styles from './RadioSelect.module.scss'

export interface RadioSelectProps {
  checked?: boolean
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  name: string
  id?: string
  label: string
  value: string
}

export const RadioSelect = ({ checked = false, name, id, onChange, value, label }: RadioSelectProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        type="radio"
        className={styles.radio}
        name={name}
        value={value} 
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  )
}
