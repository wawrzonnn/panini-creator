import React, { useState } from 'react'
import styles from './ConfigureExtras.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

import { Remove } from '../../assets/icons/Remove/Remove'

import { IngredientHeader } from '../../components/IngredientHeader/IngredientHeader'
import { DropdownSelect } from '../../components/DropdownSelect/DropdownSelect'

import { Switch } from '../../components/Switch/Switch'
import Add from '../../assets/icons/Add/Add'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

export const eggVariants = ['FRIED EGG', 'OMELET', 'SCRAMBLED EGG', 'POACHED EGG']

export const ConfigureExtras = () => {
  const { control, setValue, handleSubmit, getValues } = useForm({
    defaultValues: {
      extras: {
        egg: [eggVariants[0]],
        spreads: [],
        serving: '',
        topping: null,
      },
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'extras.egg',
  })

  const handleSelectEgg = (selectedEgg: string, index: number) => {
    const eggArray = [...getValues('extras.egg')] // Get the current egg array
    eggArray[index] = selectedEgg // Update the selected egg
    setValue('extras.egg', eggArray) // Set the new array as the value for 'extras.egg'
  }
  const handleAddEgg = () => {
    append({ value: eggVariants[0] })
  }

  const onSubmit = () => {
    const values = getValues()
    console.log('Extras:', values.extras)
  }

  return (
    <form className={styles.extras_container} onSubmit={handleSubmit(onSubmit)}>
      <main className={styles.form_container}>
        <span className={styles.form_title}>CONFIGURE EXTRAS</span>

        
        <section className={styles.first_ingredient_wrapper}>
            <Add onClick={handleAddEgg}/>
          {fields.map((item, index) => (
            <div key={item.id}>
              <Controller
                render={({ field }) => (
                  <DropdownSelect
                    items={eggVariants}
                    selectedItem={field.value as string} 
                    onSelect={(selectedItem) => handleSelectEgg(selectedItem, index)}
                  />
                )}
                name={`extras.egg[${index}]`}
                control={control}
                defaultValue={eggVariants[0]}
              />
              <Remove onClick={() => remove(index)} />
            </div>
          ))}
        </section>
        <button type="submit">Submit</button>
      </main>
    </form>
  )
}
export default ConfigureExtras
