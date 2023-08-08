import * as React from 'react'
import { PropsWithChildren, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

import styles from './Switch.module.scss'

export interface SwitchProps {
  checked?: boolean
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  id?: string
}

export const Switch = ({ checked = true, id, onChange }: PropsWithChildren<SwitchProps>) => {
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])


  const getSliderClasses = cx({
[styles.slider]: true,
[styles.sliderChecked]: !isChecked
	})

  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(!isChecked)
          onChange(e)
        }}
        id={id}
      />
      <span className={getSliderClasses} />
    </label>
  )
}