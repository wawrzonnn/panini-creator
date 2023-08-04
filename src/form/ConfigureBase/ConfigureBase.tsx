import React, { useState } from 'react'
import styles from './ConfigureBase.module.scss'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'

import { Dices } from '../../assets/icons/Dices'
import { Grain } from '../../assets/icons/Grain'
import { Wheat } from '../../assets/icons/Wheat'

import { CarouselSelect } from '../../components/CarouselSelect/CarouselSelect'
import { ButtonSelect } from '../../components/ButtonSelect/ButtonSelect'
import { IngredientHeader } from '../../components/IngredientHeader/IngredientHeader'
import { SwitchWrapper } from '../../components/SwitchWrapper/SwitchWrapper'

import { breadVariants } from '../../data/bread'
import { cheeseVariants } from '../../data/cheese'
import { meatVariants } from '../../data/meat'
import { dressingVariants } from '../../data/dressing'
import { vegetableVariant } from '../../data/vegetable'

import { formatToTitleCase } from '../../utils/formatToTitleCase'
import { IngredientSection } from '../shared/IngredientSection'

type HiddenSectionState = Record<IngredientType, boolean>
type IngredientType = 'cheese' | 'meat' | 'dressing'
type FormData = {
  base: {
    bread: string
    cheese: string[]
    meat: string[]
    dressing: string[]
    vegetables: string[]
  }
}

const ConfigureBase = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      base: {
        bread: breadVariants[0],
        cheese: [cheeseVariants[0]],
        meat: [meatVariants[0]],
        dressing: [dressingVariants[0]],
        vegetables: [vegetableVariant[0]],
      },
    },
  })
  const { control, handleSubmit, getValues, setValue, watch } = methods
  const useIngredientFieldArray = (ingredientName: string) =>
    useFieldArray({
      control,
      name: `base.${ingredientName}`,
    })
  const { fields: cheeseFields, append: appendCheese, remove: removeCheese } = useIngredientFieldArray('cheese')
  const { fields: meatFields, append: appendMeat, remove: removeMeat } = useIngredientFieldArray('meat')
  const { fields: dressingFields, append: appendDressing, remove: removeDressing } = useIngredientFieldArray('dressing')
  const { fields: vegetablesFields, append: appendVegetables, remove: removeVegetables } = useIngredientFieldArray('vegetables')

  const handleAddCheese = () => appendCheese(cheeseVariants[0])
  const handleAddMeat = () => appendMeat(meatVariants[0])
  const handleAddDressing = () => appendDressing(dressingVariants[0])
  const handleAddVegetables = () => appendVegetables(vegetableVariant[0])
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
  const handleSelectVegetables = (selectedVegetables: string, index: number) => {
    const vegetablesArray = [...getValues('base.vegetables')]
    vegetablesArray[index] = selectedVegetables
    setValue('base.vegetables', vegetablesArray)
  }
  //BREAD
  const selectedBread = watch('base.bread', breadVariants[0])
  const breadIcon = selectedBread.includes('GRAIN') ? <Grain /> : <Wheat />

  const handleBreadSelection = (selectedBread: string) => {
    setValue('base.bread', selectedBread)
  }
  //VEGETABLES
  const selectedVegetables = watch('base.vegetables', [])

  const handleSelectVegetable = (selectedVegetable: string, isChecked: boolean) => {
    let vegetablesArray = [...getValues('base.vegetables')] // Get the current vegetables array
    if (isChecked) {
      vegetablesArray.push(selectedVegetable)
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
  const onSubmit = (data: FormData) => {
    console.log('Form data:', data)
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <CarouselSelect items={breadVariants} onSelect={handleBreadSelection} icon={breadIcon} />
          </div>

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
            />
          </section>

          <section className={styles.ingredients_container}>
            <SwitchWrapper title={'Dressing'} handleSwitch={() => handleSwitch('dressing')} />
            <IngredientSection
              className={hiddenSections.dressing && styles.hidden}
              fields={dressingFields}
              items={dressingVariants}
              appendItem={handleAddDressing}
              removeItem={removeDressing}
              handleSelect={handleSelectDressing}
              control={control}
              type="carousel"
              name="dressing"
            />
          </section>

          <section className={styles.ingredients_container}>
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

          <button type="submit" className={styles.submit_button}>
            Submit
          </button>
        </main>
      </form>
    </FormProvider>
  )
}
export default ConfigureBase
