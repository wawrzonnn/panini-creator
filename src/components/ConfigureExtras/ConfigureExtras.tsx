import React, { useState } from 'react'
import styles from './ConfigureExtras.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

import { Remove } from '../../assets/icons/Remove/Remove'

import { IngredientHeader } from '../IngredientHeader/IngredientHeader'
import { DropdownSelect } from '../DropdownSelect/DropdownSelect'
import { CheckboxSelect } from '../CheckboxSelect/CheckboxSelect'
import { RadioSelect } from '../RadioSelect/RadioSelect'

import { SwitchWrapper } from '../SwitchWrapper/SwitchWrapper'
import { WrapperComponent, WrapperType } from '../WrapperComponent/WrapperComponent'

import { eggVariants } from '../../data/egg'
import { spreadVariant } from '../../data/spread'
import { servingVariant } from '../../data/serving'
import { toppingVariant } from '../../data/topping'

type ExtraEgg = { id: number; value: string }

export const ConfigureExtras = () => {
  const [hiddenEggSection, setHiddenEggSection] = useState(false)
  const [selectedEgg, setSelectedEgg] = useState(eggVariants[0])
  const [extraEggs, setExtraEggs] = useState<ExtraEgg[]>([])
  const [selectedSpreads, setSelectedSpreads] = useState<string[]>([])
  const [selectedServing, setSelectedServing] = useState<string | null>(null)
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])

  const handleSelect = (selectedItem: string, id: number) => {
    setExtraEggs((prevEggs) => prevEggs.map((egg) => (egg.id === id ? { ...egg, value: selectedItem } : egg)))
  }

  const addExtraEgg = () => {
    setExtraEggs((prevEggs) => [...prevEggs, { id: Date.now(), value: eggVariants[0] }])
  }

  const removeExtraEgg = (id: number) => {
    setExtraEggs((prevEggs) => prevEggs.filter((egg) => egg.id !== id))
  }

  const handleSwitch = () => {
    setHiddenEggSection((prevHidden) => !prevHidden)
  }

  const handleCheckboxChange = (spread: string, checked: boolean) => {
    setSelectedSpreads((prevSpreads) =>
      checked ? [...prevSpreads, spread] : prevSpreads.filter((item) => item !== spread)
    )
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedServing(e.target.value)
  }

  const handleToppingChange = (topping: string, checked: boolean) => {
    setSelectedToppings((prevToppings) =>
      checked ? [...prevToppings, topping] : prevToppings.filter((item) => item !== topping)
    )
  }

  const getEggWrapperClasses = cx({
    [styles.ingredients_container]: true,
    [styles.egg_wrapper]: true,
  })

  const getCenterWrapperClasses = cx({
    [styles.ingredients_container]: true,
    [styles.ingredients_container_center]: true,
  })

  return (
    <form className={styles.extras_container}>
      <main className={styles.form_container}>
        <span className={styles.form_title}>CONFIGURE EXTRAS</span>
        <section className={getEggWrapperClasses}>
          <SwitchWrapper title={'Egg'} handleSwitch={handleSwitch} />
          <div className={styles.ingredients_columns}>
            {!hiddenEggSection && (
              <>
                <WrapperComponent
                  items={eggVariants}
                  addExtraIngredient={addExtraEgg}
                  onSelect={setSelectedEgg}
                  type={'dropdown'}
                />
                {extraEggs.map((egg) => (
                  <div key={egg.id} className={styles.add_more}>
                    <Remove onClick={() => removeExtraEgg(egg.id)} />
                    <DropdownSelect
                      items={eggVariants}
                      onSelect={(selection: string) => handleSelect(selection, egg.id)}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </section>
        <section className={styles.ingredients_container}>
          <IngredientHeader>Spreads</IngredientHeader>
          <div className={styles.spreads_columns}>
            {spreadVariant.map((spread) => (
              <CheckboxSelect
                key={spread}
                onChange={(e) => handleCheckboxChange(spread, e.target.checked)}
                checked={selectedSpreads.includes(spread)}
                label={spread.toUpperCase()}
              />
            ))}
          </div>
        </section>
        <section className={getCenterWrapperClasses}>
          <IngredientHeader>Servings</IngredientHeader>
          <div className={styles.serving_row}>
            {servingVariant.map((serving, index) => (
              <RadioSelect
                key={index}
                onChange={handleRadioChange}
                name="serving"
                id={`serving-${index}`}
                value={serving}
                checked={selectedServing === serving}
                label={serving.toUpperCase()}
              />
            ))}
          </div>
        </section>
        <section className={getCenterWrapperClasses}>
          <IngredientHeader>Toppings</IngredientHeader>
          <div className={styles.toppings_columns}>
            {toppingVariant.map((topping) => (
              <CheckboxSelect
                key={topping}
                onChange={(e) => handleToppingChange(topping, e.target.checked)}
                checked={selectedToppings.includes(topping)}
                label={topping.toUpperCase()}
              />
            ))}
          </div>
        </section>
      </main>
    </form>
  )
}

export default ConfigureExtras
