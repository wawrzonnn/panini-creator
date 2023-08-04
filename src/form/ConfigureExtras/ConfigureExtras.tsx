import React, { useState } from 'react'
import styles from './ConfigureExtras.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

import { Remove } from '../../assets/icons/Remove/Remove'
import { Add } from '../../assets/icons/Add/Add'

import { IngredientHeader } from '../../components/IngredientHeader/IngredientHeader'
import { DropdownSelect } from '../../components/DropdownSelect/DropdownSelect'
import { SwitchWrapper } from '../../components/SwitchWrapper/SwitchWrapper'
import { CheckboxSelect } from '../../components/CheckboxSelect/CheckboxSelect'
import { RadioSelect } from '../../components/RadioSelect/RadioSelect'

import { eggVariants } from '../../data/egg'
import { spreadVariant } from '../../data/spread'
import { servingVariant } from '../../data/serving'
import { toppingVariant } from '../../data/topping'

import { useForm, useFieldArray, Controller } from 'react-hook-form'

type FormData = {
  extras: {
    egg: string[]
    spreads: string[]
    serving: string
    topping: null | string
  }
}

export const ConfigureExtras = () => {
  const { control, setValue, handleSubmit, getValues } = useForm<FormData>({
    defaultValues: {
      extras: {
        egg: [eggVariants[0]],
        spreads: [],
        serving: '',
        topping: null
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
    append(eggVariants[0])
  }

  const handleSpreadChange = (spread: string, isChecked: boolean) => {
    let updatedSpreads = [...getValues('extras.spreads')] // Get the current spreads array
    if (isChecked) {
      updatedSpreads.push(spread)
    } else {
      updatedSpreads = updatedSpreads.filter((item) => item !== spread) //remove selected spread if !checked
    }
    setValue('extras.spreads', updatedSpreads) //update array 'extras.spreads'
  }
  
  const handleToppingChange = (isChecked: boolean) => {
    setValue('extras.topping', isChecked ? toppingVariant[0] : null);
  };

  return (
    <form className={styles.extras_container}>
      <main className={styles.form_container}>
        <span className={styles.form_title}>CONFIGURE EXTRAS</span>

        <section className={styles.first_ingredient_wrapper}>
          <SwitchWrapper title={'Egg'} handleSwitch={() => console.log('click')} />
          <div className={styles.ingredients_column}>
            {fields.map((item, index) => (
              <div key={item.id} className={styles.testy}>
                {index > 0 ? <Remove onClick={() => remove(index)} /> : <Add onClick={handleAddEgg} />}
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
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ingredients_container}>
          <IngredientHeader>Spreads</IngredientHeader>
          <div className={styles.spreads_columns}>
            {spreadVariant.map((spread) => (
              <CheckboxSelect
                key={spread}
                onChange={(e) => handleSpreadChange(spread, e.target.checked)}
                checked={getValues('extras.spreads').includes(spread)}
                label={spread.toUpperCase()}
              />
            ))}
          </div>
        </section>

        <section className={styles.ingredients_container_center}>
        <IngredientHeader>Servings</IngredientHeader>
        <div className={styles.serving_row}>
          {servingVariant.map((serving, index) => (
            <Controller
              render={({ field }) => (
                <RadioSelect
                  checked={field.value === serving}
                  onChange={(e) => field.onChange(serving)}
                  name="serving"
                  id={`serving-${index}`}
                  value={serving}
                  label={serving.toUpperCase()}
                />
              )}
              name="extras.serving"
              control={control}
              defaultValue=""
            />
          ))}
        </div>
      </section>

 <section className={styles.ingredients_container_center}>
        <IngredientHeader>Toppings</IngredientHeader>
        <div className={styles.toppings_columns}>
          <CheckboxSelect
            key={toppingVariant[0]}
            onChange={(e) => handleToppingChange(e.target.checked)}
            checked={getValues('extras.topping') === toppingVariant[0]}
            label={toppingVariant[0].toUpperCase()}
          />
        </div>
      </section>
      </main>
    </form>
  )
}
export default ConfigureExtras
