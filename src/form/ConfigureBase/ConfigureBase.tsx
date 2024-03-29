import React, { useState } from 'react'
import styles from './ConfigureBase.module.scss'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'

import { Dices } from '../../assets/icons/Dices'
import { Grain } from '../../assets/icons/Grain'
import { Wheat } from '../../assets/icons/Wheat'

import { CarouselSelect } from '../../components/CarouselSelect/CarouselSelect'
import { ButtonSelect } from '../../components/ButtonSelect/ButtonSelect'
import { IngredientHeader } from '../../components/IngredientHeader/IngredientHeader'
import { SwitchWrapper } from '../../components/SwitchWrapper/SwitchWrapper'
import { IngredientSection } from '../shared/IngredientSection/IngredientSection'

import { breadVariants } from '../../data/bread'
import { cheeseVariants } from '../../data/cheese'
import { meatVariants } from '../../data/meat'
import { dressingVariants } from '../../data/dressing'
import { vegetableVariant } from '../../data/vegetable'
import { eggVariants } from '../../data/egg'

import { formatToTitleCase } from '../../utils/formatToTitleCase'
import { randomizePanini } from '../../utils/randomizePanini'
import { convertToTitleCaseWithSpace } from '../../utils/convertToTitleCaseWithSpace'
import { Switch } from '../../components/Switch/Switch'

type HiddenSectionState = Record<IngredientType, boolean>
type IngredientType = 'cheese' | 'meat' | 'dressing'

const ConfigureBase = () => {
  const { control, setValue, getValues, watch, reset } = useFormContext()

  const useIngredientFieldArray = (ingredientName: string) =>
    useFieldArray({
      control,
      name: `base.${ingredientName}`,
    })

  const { fields: cheeseFields, append: appendCheese, remove: removeCheese } = useIngredientFieldArray('cheese')
  const { fields: meatFields, append: appendMeat, remove: removeMeat } = useIngredientFieldArray('meat')
  const { fields: dressingFields, append: appendDressing, remove: removeDressing } = useIngredientFieldArray('dressing')
  const { fields: eggFields, append: appendEgg, remove: removeEgg } = useIngredientFieldArray('egg')

  const handleAddCheese = () => appendCheese(cheeseVariants[0])
  const handleAddMeat = () => appendMeat(meatVariants[0])
  const handleAddDressing = () => appendDressing(dressingVariants[0])
  const handleAddEgg = () => appendEgg(eggVariants[0])
  // CHEESE / MEAT / DRESSING
  const handleSelectCheese = (selectedCheese: string, index: number) => {
    const cheeseArray = [...getValues('base.cheese')] //get the current ingredient array
    cheeseArray[index] = selectedCheese // update selected ingredient
    setValue('base.cheese', cheeseArray) // set the new array as value for base.ingredient
  }
  const handleSelectMeat = (selectedMeat: string, index: number) => {
    const meatArray = [...getValues('base.meat')]
    meatArray[index] = selectedMeat
    setValue('base.meat', meatArray)
  }
  const handleSelectDressing = (selectedDressing: string, index: number) => {
    const dressingArray = [...getValues('base.dressing')]
    dressingArray[index] = selectedDressing
    setValue('base.dressing', dressingArray)
  }
  //BREAD
  const selectedBread = watch('base.bread', breadVariants[0]) // Icon check <Grain /> / <Wheat />
  const breadIcon = selectedBread.includes('GRAIN') ? <Grain /> : <Wheat />

  //VEGETABLES
  const selectedVegetables = watch('base.vegetables', [])

  const handleSelectVegetable = (selectedVegetable: string, isChecked: boolean) => {
    let vegetablesArray = [...getValues('base.vegetables')] // Get the current vegetables array
    if (isChecked) {
      vegetablesArray.push(selectedVegetable) // add veggie
    } else {
      vegetablesArray = vegetablesArray.filter((item) => item !== selectedVegetable) //remove selected vegetable if !checked
    }
    setValue('base.vegetables', vegetablesArray) //update array 'base.vegetables'
  }

  //hide section using Switch (checked / !checked)
  const [hiddenSections, setHiddenSections] = useState<HiddenSectionState>({
    cheese: false,
    meat: false,
    dressing: false,
  })

  //toggle the visibility of an ingredient section
  const handleSwitch = (section: IngredientType) => {
    setHiddenSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }))
  }

  const handleRandomize = () => {
    const randomValues = randomizePanini()
    reset(randomValues)
  }

  return (
    <>
      <header className={styles.header}>
        <span className={styles.header_title}>Panini Creator</span>
        <button type="button" className={styles.header_button} onClick={handleRandomize}>
          <Dices />
          RANDOMIZE PANINI
        </button>
      </header>

      <main className={styles.form_container}>
        <span className={styles.form_title}>CONFIGURE BASE</span>
        <section className={styles.bread_wrapper}>
          <IngredientHeader>Bread</IngredientHeader>
          <Controller
            render={({ field }) => {
              return (
                <CarouselSelect
                  items={breadVariants}
                  onSelect={(selectedItem) => field.onChange(selectedItem)}
                  selectedItem={field.value}
                  icon={breadIcon}
                />
              )
            }}
            name="base.bread"
            control={control}
          />
        </section>

        <section className={styles.ingredients_container}>
          <SwitchWrapper title={'Cheese'} handleSwitch={() => handleSwitch('cheese')} />
          <IngredientSection
            className={hiddenSections.cheese && styles.hidden}
            fields={cheeseFields}
            items={cheeseVariants}
            appendItem={handleAddCheese}
            removeItem={removeCheese}
            handleSelect={handleSelectCheese}
            control={control}
            type="dropdown"
            name="cheese"
            section="base"
          />
        </section>
        <section className={styles.ingredients_container}>
          <SwitchWrapper title={'Meat'} handleSwitch={() => handleSwitch('meat')} />
          <IngredientSection
            className={hiddenSections.meat && styles.hidden}
            fields={meatFields}
            items={meatVariants}
            appendItem={handleAddMeat}
            removeItem={removeMeat}
            handleSelect={handleSelectMeat}
            control={control}
            type="dropdown"
            name="meat"
            section="base"
          />
        </section>

        <section className={styles.ingredients_container}>
          <div className={styles.dressing_wrapper}>
            <SwitchWrapper title={'Dressing'} handleSwitch={() => handleSwitch('dressing')} />
          </div>
          <IngredientSection
            className={hiddenSections.dressing && styles.hidden}
            fields={dressingFields}
            items={convertToTitleCaseWithSpace(dressingVariants)}
            appendItem={handleAddDressing}
            removeItem={removeDressing}
            handleSelect={handleSelectDressing}
            control={control}
            type="carousel"
            name="dressing"
            section="base"
          />
        </section>

        <section className={styles.ingredients_container_vegetables}>
          <IngredientHeader>Vegetables</IngredientHeader>
          <div className={styles.vegetables_wrapper}>
            {vegetableVariant.map((veggie, index) => (
              <ButtonSelect
                key={index}
                item={formatToTitleCase(veggie)}
                onClick={() => handleSelectVegetable(veggie, !selectedVegetables.includes(veggie))}
                selected={selectedVegetables.includes(veggie)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
export default ConfigureBase
