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
type HiddenSection = 'cheese' | 'meat' | 'dressing' | null

const ConfigureBase = () => {
  const [selectedBread, setSelectedBread] = useState(breadVariants[0])
  const [selectedCheese, setSelectedCheese] = useState(cheeseVariants[0])
  const [selectedMeat, setSelectedMeat] = useState(meatVariants[0])
  const [selectedDressing, setSelectedDressing] = useState(dressingVariants[0])
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([])
  const [hiddenSection, setHiddenSection] = useState<HiddenSection>(null)
  const breadIcon = selectedBread.includes('GRAIN') ? <Grain /> : <Wheat />

  const [addDisabled, setAddDisabled] = useState<Record<IngredientType, boolean>>({
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
  const addExtraIngredient = (ingredientType: IngredientType) => {
    setExtraIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredientType]: [...prevIngredients[ingredientType], {}],
    }))
  }
  const hideExtraIngredient = (ingredientType: IngredientType, index: number) => {
    setExtraIngredientHidden((prevHidden) => ({
      ...prevHidden,
      [ingredientType]: { ...prevHidden[ingredientType], [index]: true },
    }))
  }
  const handleSwitch = (section: HiddenSection) => {
    setHiddenSection((prevSection) => (prevSection === section ? null : section))
    if (section !== null)
      setAddDisabled((prevState) => ({
        ...prevState,
        [section]: !prevState[section],
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

  const renderSection = (
    section: IngredientType,
    variants: string[],
    onSelect: (selection: string) => void,
    WrapperIngredient: React.ElementType,
    SelectionIngredient: React.ElementType
  ) => {
    return (
      <section className={styles.ingredients_container}>
        <SwitchWrapper title={formatToTitleCase(section)} handleSwitch={() => handleSwitch(section as HiddenSection)} />
        <div className={styles.ingredients_columns}>
          <WrapperIngredient
            items={variants}
            addExtraIngredient={() => addExtraIngredient(section)}
            onSelect={onSelect}
            disabled={addDisabled[section]}
          />
          {hiddenSection !== section &&
            extraIngredients[section].map((_, index) => {
              const hidden = extraIngredientHidden[section][index]
              const ingredientClasses = `${styles.add_more} ${hidden ? styles.hidden : ''}`
              return (
                <div key={index} className={ingredientClasses}>
                  <Remove onClick={() => hideExtraIngredient(section, index)} />
                  <SelectionIngredient items={variants} onSelect={onSelect} />
                </div>
              )
            })}
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
                selected={selectedVegetables.includes(veggie)}
              />
            ))}
          </div>
        </section>
      </main>
    </form>
  )
}

export default ConfigureBase