import React from 'react'
import { DropdownSelect } from '../DropdownSelect/DropdownSelect'
import { Add } from '../Add/Add'
import styles from './DropdownWrapper.module.scss'

interface DropdownWrapperProps {
	items: string[]
	addExtraComponent: () => void
	onSelect: (selectedItem: string) => void
}

export const DropdownWrapper: React.FC<DropdownWrapperProps> = ({ items, addExtraComponent, onSelect }) => {
	return (
		<div className={styles.dropdown__wrapper}>
			<Add onClick={addExtraComponent} />
			<DropdownSelect items={items} onSelect={onSelect} />
		</div>
	)
}

export default DropdownWrapper
