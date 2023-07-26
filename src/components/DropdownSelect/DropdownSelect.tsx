import React, { useState } from 'react'

import styles from './DropdownSelect.module.scss'

import { ArrowDown } from '../../assets/icons/ArrowDown'
import { ArrowUp } from '../../assets/icons/ArrowUp'

interface DropdownSelectProps {
	items: string[]
	onSelect: (selectedItem: string) => void
}

export const DropdownSelect = ({ items, onSelect }: DropdownSelectProps) => {
	const [selectedItem, setSelectedItem] = useState(items[0])
	const [isOpen, setIsOpen] = useState(false)

	const handleSelect = (item: string) => {
		setSelectedItem(item)
		onSelect(item)
		setIsOpen(false)
	}

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className={styles.wrapper} onClick={handleToggle}>
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
