import * as React from 'react'
import { PropsWithChildren, useEffect, useState } from 'react'

import styles from './Switch.module.scss'

export interface SwitchProps {
  checked?: boolean
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  id?: string
}

export const Switch = ({ checked = true, id, onChange }: PropsWithChildren<SwitchProps>) => {
  const [isChecked, setChecked] = useState(checked)

  useEffect(() => {
    setChecked(checked)
  }, [checked])

  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          setChecked(!isChecked)
          onChange(e)
        }}
        id={id}
      />
      <span className={styles.slider} />
    </label>
  )
}
