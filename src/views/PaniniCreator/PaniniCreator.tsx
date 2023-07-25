import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './PaniniCreator.module.scss'
import classNames from 'classnames'
const cx = classNames.bind(styles)
const PaniniCreator: React.FC<{ onOrder: () => void }> = ({ onOrder }) => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setTimeout(() => setIsVisible(true), 500) // Delay the text appearance for 500ms
	}, [])
	const getH1Classes = cx({
		[styles.panini__visible]: isVisible,
		[styles.panini__hidden]: !isVisible,
	})

	return (
		<>
			<div className={styles.container}>
				<motion.div
					className='panini-creator'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 2 }}>
					<h1 className={getH1Classes}>Tworzenie Panini</h1>
					<button onClick={onOrder}>ORDER</button>
				</motion.div>
			</div>
		</>
	)
}

export default PaniniCreator
