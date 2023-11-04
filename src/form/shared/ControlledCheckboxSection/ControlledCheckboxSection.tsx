import React from 'react'
import { Controller } from 'react-hook-form'
import { CheckboxSelect } from '../../../components/CheckboxSelect/CheckboxSelect'
import { IngredientHeader } from '../../../components/IngredientHeader/IngredientHeader'
import styles from './ControlledCheckboxSection.module.scss'

interface ControlledCheckboxSectionProps {
  name: string
  label: string
  control: any
  title: string
}

export const ControlledCheckboxSection = ({ name, label, control, title }: ControlledCheckboxSectionProps) => (
    <section className={` ${styles.ingredients_container_center} ${styles.checkbox_section}`}>
      <IngredientHeader>{title}</IngredientHeader>
      <div>
        <Controller
          name={name}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <CheckboxSelect
              label={label}
              onChange={(e) => field.onChange(e.target.checked)}
              name={name}
              checked={field.value}
            />
          )}
        />
      </div>
    </section>
)

export default ControlledCheckboxSection
