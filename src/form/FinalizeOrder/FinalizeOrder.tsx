import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import styles from './FinalizeOrder.module.scss'

import { IngredientHeader } from '../../components/IngredientHeader/IngredientHeader'
import { TextField } from '../../components/TextField/TextField'
import { ControlledCheckboxSection } from '../shared/ControlledCheckboxSection/ControlledCheckboxSection'

const FinalizeOrder = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div className={styles.finalize_container}>
      <main className={styles.form_container}>
        <span className={styles.form_title}>FINALIZE ORDER</span>
        <section className={styles.first_ingredient_wrapper}>
          <IngredientHeader>Name panini</IngredientHeader>
          <Controller
            name="paniniName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                placeholder={'eg. Club Panini'}
                name="paniniName"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors.paniniName ? 'Name is too long. Max 35 characters.' : undefined}
              />
            )}
          />
        </section>

        <ControlledCheckboxSection title="Cutlery" name="cutlery" label="ADD TO ORDER" control={control} />
        <ControlledCheckboxSection title="Napkins" name="napkins" label="ADD TO ORDER" control={control} />

        <section className={styles.buttons_wrapper}>
          <button type="submit" className={styles.button_black}>
            PLACE ORDER
          </button>
          <button className={styles.button_white}>START AGAIN</button>
        </section>
      </main>
    </div>
  )
}

export default FinalizeOrder
