import * as React from 'react'
import styles from './TextField.module.scss'

export interface TextFieldProps {
  label?: string
  placeholder?: string
  id?: string
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  name: string
  value?: string
  error?: string
}

export const TextField = ({ label, placeholder, id, onChange, name, value, error }: TextFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{label}</label>
      <input className={styles.input} id={id} placeholder={placeholder} onChange={handleChange} name={name} value={value} />
      {error && <p className={styles.error_message}>{error}</p>}
    </div>
  )
}
