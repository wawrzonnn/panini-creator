import * as React from 'react'
import styles from './TextField.module.scss'

export interface TextFieldProps {
  label?: string
  placeholder?: string
  id?: string
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  name: string
}

export const TextField = ({ label, placeholder, id, onChange, name }: TextFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input className={styles.input} id={id} placeholder={placeholder} onChange={handleChange} name={name} />
    </div>
  )
}
