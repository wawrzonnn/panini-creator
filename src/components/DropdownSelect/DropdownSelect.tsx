import React, { useState, useEffect, useRef } from 'react'
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

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: string) => {
    setLocalSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  const handleToggle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef} onClick={handleToggle}>
      <div className={styles.selectedItem}>{selectedItem}</div>
      {isOpen && (
        <div className={styles.options}>
          {items.map((item, index) => {
            if (item !== selectedItem) {
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