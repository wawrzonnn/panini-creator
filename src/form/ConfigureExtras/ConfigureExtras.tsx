import React, { useState } from 'react'
import { useFieldArray, Controller, useFormContext } from 'react-hook-form'
import styles from './ConfigureExtras.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

import { IngredientHeader } from '../../components/IngredientHeader/IngredientHeader'
import { SwitchWrapper } from '../../components/SwitchWrapper/SwitchWrapper'
import { CheckboxSelect } from '../../components/CheckboxSelect/CheckboxSelect'
import { RadioSelect } from '../../components/RadioSelect/RadioSelect'
import { IngredientSection } from '../shared/IngredientSection/IngredientSection'

import { eggVariants } from '../../data/egg'
import { spreadVariant } from '../../data/spread'
import { servingVariant } from '../../data/serving'
import { toppingVariant } from '../../data/topping'

export const ConfigureExtras = () => {
  const [hiddenSection, setHiddenSection] = useState<boolean>(false)

  const { control, setValue, getValues, reset, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'extras.egg',
  })
  const handleAddEgg = () => {
    append(eggVariants[0])
  }

  const handleSelectEgg = (selectedEgg: string, index: number) => {
    const eggArray = [...getValues('extras.egg')] // Get the current egg array
    eggArray[index] = selectedEgg // Update the selected egg
    setValue('extras.egg', eggArray) // Set the new array as the value for 'extras.egg'
  }
//SPREADS
  const selectedSpreads = watch('extras.spreads', [])

  const handleSelectSpread = (selectedSpread: string, isChecked: boolean) => {
    let spreadsArray = [...getValues('extras.spreads')] // Get the current spreads array
    if (isChecked) {
      spreadsArray.push(selectedSpread) // add spread
    } else {
      spreadsArray = spreadsArray.filter((item) => item !== selectedSpread) //remove selected spread if !checked
    }
    setValue('extras.spreads', spreadsArray) //update array 'extras.spreads'
  }

  const handleSwitch = () => {
    setHiddenSection(!hiddenSection)
  }

  return (
    <div className={styles.extras_container}>
      <main className={styles.form_container}>
        <span className={styles.form_title}>CONFIGURE EXTRAS</span>

        <section className={styles.first_ingredient_wrapper}>
          <SwitchWrapper title={'Egg'} handleSwitch={handleSwitch} />
          <IngredientSection
            className={hiddenSection && styles.hidden}
            fields={fields}
            items={eggVariants}
            appendItem={handleAddEgg}
            removeItem={remove}
            handleSelect={handleSelectEgg}
            control={control}
            type="dropdown"
            name="egg"
            section="extras"
          />
        </section>
   
        <section className={styles.ingredients_container}>
          <IngredientHeader>Spreads</IngredientHeader>
          <div className={styles.spreads_columns}>
            {spreadVariant.map((spread, index) => (
              <CheckboxSelect
                key={index}
                label={spread}
                onChange={() => handleSelectSpread(spread, !selectedSpreads.includes(spread))}
                checked={selectedSpreads.includes(spread)}
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
            <Controller
              name="extras.topping"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <CheckboxSelect
                  key={toppingVariant[0]}
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value}
                  label={toppingVariant[0].toUpperCase()}
                />
              )}
            />
          </div>
        </section>
      </main>
    </div>
  )
}
export default ConfigureExtras
