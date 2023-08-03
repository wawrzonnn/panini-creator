import React, { useState } from 'react'
import styles from './ConfigureBase.module.scss'
import classNames from 'classnames'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
const cx = classNames.bind(styles)

import { Dices } from '../../assets/icons/Dices'
import { Grain } from '../../assets/icons/Grain'
import { Wheat } from '../../assets/icons/Wheat'
import { Remove } from '../../assets/icons/Remove/Remove'
import Add from '../../assets/icons/Add/Add'

import { CarouselSelect } from '../../components/CarouselSelect/CarouselSelect'
import { DropdownSelect } from '../../components/DropdownSelect/DropdownSelect'
import { ButtonSelect } from '../../components/ButtonSelect/ButtonSelect'
import { IngredientHeader } from '../../components/IngredientHeader/IngredientHeader'
import { SwitchWrapper } from '../../components/SwitchWrapper/SwitchWrapper'

import { breadVariants } from '../../data/bread'
import { cheeseVariants } from '../../data/cheese'
import { meatVariants } from '../../data/meat'
import { dressingVariants } from '../../data/dressing'
import { vegetableVariant } from '../../data/vegetable'

import { formatToTitleCase } from '../../utils/formatToTitleCase'

type HiddenSectionState = Record<IngredientType, boolean>
type IngredientType = 'cheese' | 'meat' | 'dressing';
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
  const { control, setValue, handleSubmit, getValues } = useForm<FormData>({
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
  const useIngredientFieldArray = (ingredientName: string) => useFieldArray({
    control,
    name: `base.${ingredientName}`,
  });
  const { fields: cheeseFields, append: appendCheese, remove: removeCheese } = useIngredientFieldArray('cheese');
  const { fields: meatFields, append: appendMeat, remove: removeMeat } = useIngredientFieldArray('meat');
  const { fields: dressingFields, append: appendDressing, remove: removeDressing } = useIngredientFieldArray('dressing');

  const handleAddCheese = () => appendCheese(cheeseVariants[0]);
  const handleAddMeat = () => appendMeat(meatVariants[0]); 
  const handleAddDressing = () => appendDressing(dressingVariants[0]);

  const handleSelectCheese = (selectedCheese: string, index: number) => {
    const cheeseArray = [...getValues('base.cheese')] //get the current ingredient array
    cheeseArray[index] = selectedCheese  // update selected ingredient
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

  const [selectedBread, setSelectedBread] = useState(breadVariants[0])
  const breadIcon = selectedBread.includes('GRAIN') ? <Grain /> : <Wheat />

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

        <section className={styles.ingredients_container}>
          <SwitchWrapper title={'Cheese'} handleSwitch={() => console.log('click')} />
          <div className={styles.ingredients_column}>
            {cheeseFields.map((item, index) => (
              <div key={item.id} className={styles.testy}>
                {index > 0 ? <Remove onClick={() => removeCheese(index)} /> : <Add onClick={handleAddCheese} />}
                <Controller
                  render={({ field }) => (
                    <DropdownSelect
                      items={cheeseVariants}
                      selectedItem={field.value as string}
                      onSelect={(selectedItem) => handleSelectCheese(selectedItem, index)}
                    />
                  )}
                  name={`base.cheese[${index}]`}
                  control={control}
                  defaultValue={cheeseVariants[0]}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ingredients_container}>
          <SwitchWrapper title={'Meat'} handleSwitch={() => console.log('click')} />
          <div className={styles.ingredients_column}>
            {meatFields.map((item, index) => (
              <div key={item.id} className={styles.testy}>
                {index > 0 ? <Remove onClick={() => removeMeat(index)} /> : <Add onClick={handleAddMeat} />}
                <Controller
                  render={({ field }) => (
                    <DropdownSelect
                      items={meatVariants}
                      selectedItem={field.value as string}
                      onSelect={(selectedItem) => handleSelectMeat(selectedItem, index)}
                    />
                  )}
                  name={`base.meat[${index}]`}
                  control={control}
                  defaultValue={meatVariants[0]}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ingredients_container}>
          <SwitchWrapper title={'Dressing'} handleSwitch={() => console.log('click')} />
          <div className={styles.ingredients_column}>
            {dressingFields.map((item, index) => (
              <div key={item.id} className={styles.testy}>
                {index > 0 ? <Remove onClick={() => removeDressing(index)} /> : <Add onClick={handleAddDressing} />}
                <Controller
                  render={({ field }) => (
                    <CarouselSelect
                      items={dressingVariants}
                      selectedItem={field.value as string}
                      onSelect={(selectedItem) => handleSelectDressing(selectedItem, index)}
                    />
                  )}
                  name={`base.dressing[${index}]`}
                  control={control}
                  defaultValue={dressingVariants[0]}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ingredients_container}>
          <IngredientHeader>Vegetables</IngredientHeader>
          <div className={styles.vegetables_wrapper}>
            {vegetableVariant.map((veggie, index) => (
              <ButtonSelect
                key={index}
                item={formatToTitleCase(veggie)}
                onClick={() => console.log('click')}
                // selected={() => console.log('click')}
              />
            ))}
          </div>
        </section>
      </main>
    </form>
  )
}
export default ConfigureBase
