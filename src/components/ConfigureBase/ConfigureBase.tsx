import React, { useState } from 'react'
import styles from './ConfigureBase.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

import { Dices } from '../../assets/icons/Dices'
import { Grain } from '../../assets/icons/Grain'
import { Wheat } from '../../assets/icons/Wheat'
import { Remove } from '../../assets/icons/Remove/Remove'

import { CarouselSelect } from '../CarouselSelect/CarouselSelect'
import { DropdownSelect } from '../DropdownSelect/DropdownSelect'
import { ButtonSelect } from '../ButtonSelect/ButtonSelect'
import { IngredientHeader } from '../IngredientHeader/IngredientHeader'

import { breadVariants } from '../../data/bread'
import { cheeseVariants } from '../../data/cheese'
import { meatVariants } from '../../data/meat'
import { dressingVariants } from '../../data/dressing'
import { vegetableVariant } from '../../data/vegetable'

import { SwitchWrapper } from '../SwitchWrapper/SwitchWrapper'
import { WrapperComponent, WrapperType } from '../WrapperComponent/WrapperComponent'

import { formatToTitleCase } from '../../utils/formatToTitleCase'

type IngredientType = 'cheese' | 'meat' | 'dressing'
type ExtraIngredientState = Record<IngredientType, { id: number; value: any }[]>
type HiddenSectionState = Record<IngredientType, boolean>

const ConfigureBase = () => {
  // base ingredients state
  const [selectedBread, setSelectedBread] = useState(breadVariants[0])
  const [selectedCheese, setSelectedCheese] = useState(cheeseVariants[0])
  const [selectedMeat, setSelectedMeat] = useState(meatVariants[0])
  const [selectedDressing, setSelectedDressing] = useState(dressingVariants[0])
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([])
  const breadIcon = selectedBread.includes('GRAIN') ? <Grain /> : <Wheat />

  //extra ingredients state
  const [extraIngredients, setExtraIngredients] = useState<ExtraIngredientState>({
    cheese: [],
    meat: [],
    dressing: [],
  })
  //hide section using Switch (checked / !checked)
  const [hiddenSections, setHiddenSections] = useState<HiddenSectionState>({
    cheese: false,
    meat: false,
    dressing: false,
  })

  //handle the selection of extra ingredients
  const handleSelect = (selectedItem: string, id: number, ingredientType: IngredientType) => {
    setExtraIngredients((prevIngredients) => {
      let newIngredients = { ...prevIngredients }
      newIngredients[ingredientType] = newIngredients[ingredientType].map((ingredient) =>
        ingredient.id === id ? { ...ingredient, value: selectedItem } : ingredient
      )
      return newIngredients
    })
  }
  // add extra ingredients of a specific type (cheese | meat | dressing)
  const addExtraIngredient = (ingredientType: IngredientType) => {
    setExtraIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredientType]: [
        ...prevIngredients[ingredientType],
        {
          id: Date.now(),
          value:
            ingredientType === 'cheese'
              ? cheeseVariants[0]
              : ingredientType === 'meat'
              ? meatVariants[0]
              : dressingVariants[0],
        },
      ],
    }))
  }

  const removeExtraIngredient = (ingredientType: IngredientType, id: number) => {
    setExtraIngredients((prevIngredients) => {
      let newIngredients = { ...prevIngredients }
      newIngredients[ingredientType] = newIngredients[ingredientType].filter((ingredient) => ingredient.id !== id)
      return newIngredients
    })
  }
  //toggle the visibility of an ingredient section
  const handleSwitch = (section: IngredientType) => {
    setHiddenSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }))
  }
  //handle the selection of vegetables
  const handleButtonClick = (item: string) => {
    setSelectedVegetables((prevState) => {
      const formattedItem = formatToTitleCase(item)
      if (prevState.includes(formattedItem)) {
        return prevState.filter((i) => i !== formattedItem)
      }
      return [...prevState, formattedItem]
    })
  }

  const renderSection = (
    section: IngredientType, // choose extra ingredient type ( cheese | meat | dressing)
    variants: string[], // choose variants/items from database
    onSelect: (selection: string) => void, // choose state to update (extra ingredients ( cheese | meat | dressing))
    type: WrapperType // choose 'dropdown' or 'carousel'
  ) => {
    return (
      <section className={styles.ingredients_container}>
        <SwitchWrapper title={formatToTitleCase(section)} handleSwitch={() => handleSwitch(section)} />
        <div className={styles.ingredients_columns}>
          {!hiddenSections[section] && (
            <>
              <WrapperComponent
                items={variants}
                addExtraIngredient={() => addExtraIngredient(section)}
                onSelect={onSelect}
                type={type}
              />
              {extraIngredients[section].map((ingredient) => {
                const getIngredientClasses = cx({
                  [styles.add_more]: true,
                  [styles.separator]: type === 'carousel',
                })
                return (
                  <div key={ingredient.id} className={getIngredientClasses}>
                    <Remove onClick={() => removeExtraIngredient(section, ingredient.id)} />
                    {type === 'dropdown' ? (
                      <DropdownSelect
                        items={variants}
                        onSelect={(selection: string) => handleSelect(selection, ingredient.id, section)}
                      />
                    ) : (
                      <CarouselSelect
                        items={variants}
                        onSelect={(selection: string) => handleSelect(selection, ingredient.id, section)}
                      />
                    )}
                  </div>
                )
              })}
            </>
          )}
        </div>
      </section>
    )
  }
  return (
    <form>
      <div className={styles.header}>
        <span className={styles.header_title}>Panini Creator</span>
        <button className={styles.header_button}>
          <Dices />
          RANDOMIZE PANINI
        </button>
      </div>

      <main className={styles.form_container}>
        <span className={styles.form_title}>CONFIGURE BASE</span>
        <div className={styles.bread_wrapper}>
          <IngredientHeader>Bread</IngredientHeader>
          <CarouselSelect items={breadVariants} onSelect={setSelectedBread} icon={breadIcon} />
        </div>
        {renderSection('cheese', cheeseVariants, setSelectedCheese, 'dropdown')}
        {renderSection('meat', meatVariants, setSelectedMeat, 'dropdown')}
        {renderSection('dressing', dressingVariants, setSelectedDressing, 'carousel')}
        <section className={styles.ingredients_container}>
          <IngredientHeader>Vegetables</IngredientHeader>
          <div className={styles.vegetables_wrapper}>
            {vegetableVariant.map((veggie, index) => (
              <ButtonSelect
                key={index}
                item={formatToTitleCase(veggie)}
                onClick={handleButtonClick}
                selected={selectedVegetables.includes(formatToTitleCase(veggie))}
              />
            ))}
          </div>
        </section>
      </main>
    </form>
  )
}

export default ConfigureBase
