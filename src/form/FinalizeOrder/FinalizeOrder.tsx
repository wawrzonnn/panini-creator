import React, { useState } from 'react'
import styles from './FinalizeOrder.module.scss'

import { IngredientHeader } from '../../components/IngredientHeader/IngredientHeader'
import { TextField } from '../../components/TextField/TextField'
import { CheckboxSelect } from '../../components/CheckboxSelect/CheckboxSelect'

const FinalizeOrder = () => {
  const [paniniName, setPaniniName] = useState<string>('')
  const [extras, setExtras] = useState<{ cutlery: boolean; napkins: boolean }>({
    cutlery: false,
    napkins: false,
  })

  const handlePaniniNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaniniName(event.target.value)
  }

  const handleCheckboxChange = (item: keyof typeof extras) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtras((prevExtras) => ({
      ...prevExtras,
      [item]: event.target.checked,
    }))
  }

  return (
    <form className={styles.finalize_container}>
      <main className={styles.form_container}>
        <span className={styles.form_title}>FINALIZE ORDER</span>
        <section className={styles.first_ingredient_wrapper}>
          <IngredientHeader>Name panini</IngredientHeader>
          <TextField onChange={handlePaniniNameChange} placeholder={'eg. Club Panini'} />
        </section>
        <section className={styles.ingredients_container_center}>
          <IngredientHeader>Cutlery</IngredientHeader>
          <div>
            <CheckboxSelect
              label={'ADD TO ORDER'}
              onChange={handleCheckboxChange('cutlery')}
              checked={extras.cutlery}
            />
          </div>
        </section>
        <section className={styles.ingredients_container_center}>
          <IngredientHeader>Napkins</IngredientHeader>
          <div>
            <CheckboxSelect
              label={'ADD TO ORDER'}
              onChange={handleCheckboxChange('napkins')}
              checked={extras.napkins}
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
