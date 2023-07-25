import React, { useState } from 'react'
import styles from './ConfigureBase.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)

import { Dices } from '../../assets/icons/Dices'
import { Grain } from '../../assets/icons/Grain'
import { Wheat } from '../../assets/icons/Wheat'
import { Remove } from '../Remove/Remove'
import { CarouselSelect } from '../CarouselSelect/CarouselSelect'
import { DropdownSelect } from '../DropdownSelect/DropdownSelect'
import { IngredientHeader } from '../IngredientHeader/IngredientHeader'
import { breadVariants } from '../../data/bread'
import { cheeseVariants } from '../../data/cheese'
import { meatVariants } from '../../data/meat'
import { dressingVariants } from '../../data/dressing'
import { vegetableVariant } from '../../data/vegetable'
import { SwitchWrapper } from '../SwitchWrapper/SwitchWrapper'
import { DropdownWrapper } from '../DropdownWrapper/DropdownWrapper'
import { CarouselWrapper } from '../CarouselWrapper/CarouselWrapper'

type ComponentType = 'Cheese' | 'Meat' | 'Dressing'
type ExtraComponentState = Record<ComponentType, number>
type HiddenSection = 'Cheese' | 'Meat' | 'Dressing' | null

const ConfigureBase = () => {
	const [selectedBread, setSelectedBread] = useState(breadVariants[0])
	const [selectedCheese, setSelectedCheese] = useState(cheeseVariants[0])
	const [selectedMeat, setSelectedMeat] = useState(meatVariants[0])
	const [selectedDressing, setSelectedDressing] = useState(dressingVariants[0])
	const [switchOn, setSwitchOn] = useState<boolean>(true)
	const [hiddenSection, setHiddenSection] = useState<HiddenSection>(null)
	const breadIcon = selectedBread.includes('GRAIN') ? <Grain /> : <Wheat />

	const [extraComponents, setExtraComponents] = useState<ExtraComponentState>({
		Cheese: 0,
		Meat: 0,
		Dressing: 0,
	})
	const addExtraComponent = (componentType: ComponentType) => {
		setExtraComponents(prevComponents => ({
			...prevComponents,
			[componentType]: prevComponents[componentType] + 1,
		}))
	}
	const hideExtraComponent = (componentType: ComponentType, index: number) => {
		setExtraComponents(prevComponents => ({
			...prevComponents,
			[componentType]: prevComponents[componentType] === 0 ? 0 : prevComponents[componentType] - 1,
		}))
	}
	const handleSwitch = (section: HiddenSection) => {
		setHiddenSection(prevSection => (prevSection === section ? null : section))
	}

	const renderSection = (section: ComponentType, variants: string[], onSelect: (selection: string) => void, WrapperComponent: React.ElementType, SelectionComponent: React.ElementType) => {

		return (
			<section className={styles.extra__ingredients_container}>
				<SwitchWrapper title={section} handleSwitch={() => handleSwitch(section as HiddenSection)} />
				<div className={styles.extra__ingredients_columns}>
					<WrapperComponent
						items={variants}
						addExtraComponent={() => addExtraComponent(section)}
						onSelect={onSelect}
					/>
					{hiddenSection !== section &&
						[...Array(extraComponents[section])].map((_, index) => {
							return (
								<div key={index} className={styles.add__more_margin}>
									<Remove onClick={() => hideExtraComponent(section, index)} />
									<SelectionComponent items={variants} onSelect={onSelect} />
								</div>
							)
						})}
				</div>
			</section>
		)
	}

	return (
		<form>
			<div className={styles.header}>
				<span className={styles.header__title}>Panini Creator</span>
				<button className={styles.header__button}>
					<Dices />
					RANDOMIZE PANINI
				</button>
			</div>

			<main className={styles.form__wrapper}>
				<span className={styles.form__title}>CONFIGURE BASE</span>
				<div className={styles.bread__wrapper}>
					<IngredientHeader>Bread</IngredientHeader>
					<CarouselSelect items={breadVariants} onSelect={setSelectedBread} icon={breadIcon} />
				</div>

				{renderSection('Cheese', cheeseVariants, setSelectedCheese, DropdownWrapper, DropdownSelect)}
				{renderSection('Meat', meatVariants, setSelectedMeat, DropdownWrapper, DropdownSelect)}
				{renderSection('Dressing', dressingVariants, setSelectedDressing, CarouselWrapper, CarouselSelect)}
			</main>
		</form>
	)
}

export default ConfigureBase