import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { DropdownSelect } from '../../components/DropdownSelect/DropdownSelect'
import { CarouselSelect } from '../../components/CarouselSelect/CarouselSelect'
import { Add } from '../../assets/icons/Add/Add'
import { Remove } from '../../assets/icons/Remove/Remove'
import styles from './IngredientSection.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

export type IngredientSectionProps = {
  fields: any[]
  items: string[]
  appendItem: () => void
  removeItem: (index: number) => void
  handleSelect: (selectedItem: string, index: number) => void
  control: any
  name: string
  type: 'dropdown' | 'carousel'
  className?: string
}

export const IngredientSection: React.FC<IngredientSectionProps> = ({
  fields,
  items,
  appendItem,
  removeItem,
  handleSelect,
  control,
  name,
  type,
  className,
}) => {
  const { setValue } = useFormContext()

  return (
    <div className={className}>
      <div className={styles.ingredients_column}>
        {fields.map((item, index) => {
          const carouselClasses = index > 0 ? styles.separator : ''
          return (
            <div key={item.id} className={styles.add_more}>
              {index > 0 ? <Remove onClick={() => removeItem(index)} /> : <Add onClick={appendItem} />}
              <Controller
                render={({ field }) => {
                  return type === 'dropdown' ? (
                    <DropdownSelect
                      items={items}
                      selectedItem={field.value as string}
                      onSelect={(selectedItem) => {
                        handleSelect(selectedItem, index)
                        setValue(`base.${name}[${index}]`, selectedItem)
                      }}
                    />
                  ) : (
                    <div className={carouselClasses}>
                      <CarouselSelect
                        items={items}
                        selectedItem={field.value as string}
                        onSelect={(selectedItem) => handleSelect(selectedItem, index)}
                      />
                    </div>
                  )
                }}
                name={`base.${name}[${index}]`}
                control={control}
                defaultValue={items[0]}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default IngredientSection
