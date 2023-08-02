import React, { useState } from 'react'
import styles from './DropdownSelect.module.scss'
import { ArrowDown } from '../../assets/icons/ArrowDown'
import { ArrowUp } from '../../assets/icons/ArrowUp'

interface DropdownSelectProps {
  items: string[]
  onSelect: (selectedItem: string) => void
  selectedItem?: string 
}

export const DropdownSelect = ({
  items,
  onSelect,
  selectedItem: controlledSelectedItem,
}: DropdownSelectProps) => {
  const [localSelectedItem, setLocalSelectedItem] = useState(items[0]);
  const [isOpen, setIsOpen] = useState(false);

  const selectedItem = controlledSelectedItem ?? localSelectedItem;

  const handleSelect = (item: string) => {
    setLocalSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.wrapper} onClick={handleToggle}>
      <div className={styles.selectedItem}>{controlledSelectedItem || selectedItem}</div>
      {isOpen && (
        <div className={styles.options}>
          {items.map((item, index) => {
            if (item !== (controlledSelectedItem || selectedItem)) {
              return (
                <div key={index} className={styles.option} onClick={() => handleSelect(item)}>
                  {item}
                </div>
              )
            }
            return null
          })}
        </div>
      )}
      <span className={styles.arrow}>{isOpen ? <ArrowUp /> : <ArrowDown />}</span>
    </div>
  )
}