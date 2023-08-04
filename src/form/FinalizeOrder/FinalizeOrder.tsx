import React from 'react'
import styles from './FinalizeOrder.module.scss'

import { IngredientHeader } from '../../components/IngredientHeader/IngredientHeader'
import { TextField } from '../../components/TextField/TextField'
import { CheckboxSelect } from '../../components/CheckboxSelect/CheckboxSelect'
import { useFormContext, Controller } from 'react-hook-form'

interface FinalizeOrderProps {
  onPlaceOrder: () => void
}

const FinalizeOrder = ({ onPlaceOrder }: FinalizeOrderProps) => {
  const { control } = useFormContext()

  return (
    <form className={styles.finalize_container}>
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
              />
            )}
          />
        </section>
        <section className={styles.ingredients_container_center}>
          <IngredientHeader>Cutlery</IngredientHeader>
          <div>
            <Controller
              name="cutlery"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <CheckboxSelect
                  label={'ADD TO ORDER'}
                  onChange={(e) => field.onChange(e.target.checked)} 
                  name="cutlery"
                />
              )}
            />
          </div>
        </section>
        <section className={styles.ingredients_container_center}>
          <IngredientHeader>Napkins</IngredientHeader>
          <div>
            <Controller
              name="napkins"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <CheckboxSelect
                  label={'ADD TO ORDER'}
                  onChange={(e) => field.onChange(e.target.checked)}
                  name="napkins"
                />
              )}
            />
          </div>
        </section>
        <section className={styles.buttons_wrapper}>
          <button className={styles.button_black}>PLACE ORDER</button>
          <button className={styles.button_white}>START AGAIN</button>
        </section>
      </main>
    </form>
  )
}

export default FinalizeOrder
