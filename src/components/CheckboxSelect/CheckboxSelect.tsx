import * as React from 'react'
import { PropsWithChildren, useEffect, useState } from 'react'

import styles from './CheckboxSelect.module.scss'

export interface CheckboxSelectProps {
  checked?: boolean
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  id?: string
  label: string
}

export const CheckboxSelect = ({ checked = true, id, onChange, label }: PropsWithChildren<CheckboxSelectProps>) => {
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  return (
    <div className={styles.wrapper}>
      <label
        htmlFor={id}
        className={styles.label}
        onClick={(e) => {
          setIsChecked(!isChecked)
        }}
      >
        {label}
      </label>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(!isChecked)
          onChange(e)
        }}
        id={id}
      />
    </div>
  )
}
