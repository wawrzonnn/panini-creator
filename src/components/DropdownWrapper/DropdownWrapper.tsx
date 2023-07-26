import React from 'react'
import { DropdownSelect } from '../DropdownSelect/DropdownSelect'
import { Add } from '../../assets/icons/Add/Add'
import styles from './DropdownWrapper.module.scss'

interface DropdownWrapperProps {
	items: string[]
	addExtraIngredient: () => void
	onSelect: (selectedItem: string) => void
	disabled: boolean
}

export const DropdownWrapper: React.FC<DropdownWrapperProps> = ({ items, addExtraIngredient, onSelect, disabled }) => {
	return (
		<div className={styles.dropdown__wrapper}>
			<Add onClick={addExtraIngredient} disabled={disabled} />
			<DropdownSelect items={items} onSelect={onSelect} />
		</div>
	)
}

export default DropdownWrapper
