import * as React from 'react'
import { PropsWithChildren, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './CheckboxSelect.module.scss'
const cx = classNames.bind(styles)

export interface CheckboxSelectProps {
  checked?: boolean
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  id?: string
  label: string
  name?: string
}

export const CheckboxSelect = ({
  checked = true,
  id,
  onChange,
  label,
  name,
}: PropsWithChildren<CheckboxSelectProps>) => {
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const getCheckboxClasses = cx({
    [styles.checkbox]: true,
    [styles.checkboxChecked]: isChecked,
  })

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
      <div className={getCheckboxClasses}  onClick={(e) => {
          setIsChecked(!isChecked)
        }}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(!isChecked)
            onChange(e)
          }}
          id={id}
          name={name}
        />
      </div>
    </div>
  )
}