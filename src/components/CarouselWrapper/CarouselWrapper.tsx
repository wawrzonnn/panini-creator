import React from 'react'
import { CarouselSelect } from '../CarouselSelect/CarouselSelect'
import { Add } from '../../assets/icons/Add/Add'
import styles from './CarouselWrapper.module.scss'

interface CarouselWrapperProps {
	items: string[]
	addExtraIngredient: () => void
	onSelect: (selectedItem: string) => void
	disabled: boolean
}

export const CarouselWrapper: React.FC<CarouselWrapperProps> = ({ items, addExtraIngredient, onSelect, disabled }) => {
	return (
		<div className={styles.carousel__wrapper}>
			<Add onClick={addExtraIngredient} disabled={disabled} />
			<CarouselSelect items={items} onSelect={onSelect} />
		</div>
	)
}

export default CarouselWrapper
