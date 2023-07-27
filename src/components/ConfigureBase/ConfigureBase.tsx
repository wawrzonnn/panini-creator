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
import { DropdownWrapper } from '../DropdownWrapper/DropdownWrapper'
import { CarouselWrapper } from '../CarouselWrapper/CarouselWrapper'

import { formatToTitleCase } from '../../utils/formatToTitleCase'

type IngredientType = 'cheese' | 'meat' | 'dressing'
type ExtraIngredientState = Record<IngredientType, any[]>
type HiddenIngredientState = Record<IngredientType, Record<number, boolean>>
type HiddenSectionState = Record<IngredientType, boolean>

const ConfigureBase = () => {
  const [selectedBread, setSelectedBread] = useState(breadVariants[0])
  const [selectedCheese, setSelectedCheese] = useState(cheeseVariants[0])
  const [selectedMeat, setSelectedMeat] = useState(meatVariants[0])
  const [selectedDressing, setSelectedDressing] = useState(dressingVariants[0])
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([])
  const breadIcon = selectedBread.includes('GRAIN') ? <Grain /> : <Wheat />

  const [hiddenSections, setHiddenSections] = useState<HiddenSectionState>({
    cheese: false,
    meat: false,
    dressing: false,
  })

  const [extraIngredients, setExtraIngredients] = useState<ExtraIngredientState>({
    cheese: [],
    meat: [],
    dressing: [],
  })

  const [extraIngredientHidden, setExtraIngredientHidden] = useState<HiddenIngredientState>({
    cheese: {},
    meat: {},
    dressing: {},
  })

  const handleSelect = (selectedItem: string, index: number, ingredientType: IngredientType) => {
    setExtraIngredients((prevIngredients) => {
      let newIngredients = { ...prevIngredients }
      newIngredients[ingredientType][index] = selectedItem
      return newIngredients
    })
  }

  const addExtraIngredient = (ingredientType: IngredientType) => {
    setExtraIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredientType]: [
        ...prevIngredients[ingredientType],
        ingredientType === 'cheese'
          ? cheeseVariants[0]
          : ingredientType === 'meat'
          ? meatVariants[0]
          : dressingVariants[0],
      ],
    }))
  }

  const removeExtraIngredient = (ingredientType: IngredientType, index: number) => {
    setExtraIngredients((prevIngredients) => {
      let newIngredients = { ...prevIngredients }
      newIngredients[ingredientType] = newIngredients[ingredientType].filter((_, i) => i !== index)
      return newIngredients
    })
    setExtraIngredientHidden((prevHidden) => {
      let newHidden = { ...prevHidden }
      newHidden[ingredientType] = Object.fromEntries(
        Object.entries(newHidden[ingredientType]).filter(([key]) => Number(key) !== index)
      )
      return newHidden
    })
  }

  const handleSwitch = (section: IngredientType) => {
    setHiddenSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }))
  }

  const handleButtonClick = (item: string) => {
    setSelectedVegetables((prevState) => {
      const formattedItem = formatToTitleCase(item)
      if (prevState.includes(formattedItem)) {
        return prevState.filter((i) => i !== formattedItem)
      }
      return [...prevState, formattedItem]
    })
  }
  console.log(extraIngredients)
  const renderSection = (
    section: IngredientType,
    variants: string[],
    onSelect: (selection: string) => void,
    WrapperIngredient: React.ElementType,
    SelectionIngredient: React.ElementType
  ) => {
    return (
      <section className={styles.ingredients_container}>
        <SwitchWrapper title={formatToTitleCase(section)} handleSwitch={() => handleSwitch(section)} />
        <div className={styles.ingredients_columns}>
          {!hiddenSections[section] && (
            <>
              <WrapperIngredient
                items={variants}
                addExtraIngredient={() => addExtraIngredient(section)}
                onSelect={onSelect}
              />
              {extraIngredients[section].map((_, index) => {
                const hidden = extraIngredientHidden[section][index]
                const ingredientClasses = `${styles.add_more} ${hidden ? styles.hidden : ''}`
                return (
                  <div key={index} className={ingredientClasses}>
                    <Remove onClick={() => removeExtraIngredient(section, index)} />
                    <SelectionIngredient
                      items={variants}
                      onSelect={(selection: string) => handleSelect(selection, index, section)}
                    />
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

        {renderSection('cheese', cheeseVariants, setSelectedCheese, DropdownWrapper, DropdownSelect)}
        {renderSection('meat', meatVariants, setSelectedMeat, DropdownWrapper, DropdownSelect)}
        {renderSection('dressing', dressingVariants, setSelectedDressing, CarouselWrapper, CarouselSelect)}
        <section className={styles.ingredients_container}>
          <IngredientHeader>Bread</IngredientHeader>
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
