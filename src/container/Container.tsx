import React from 'react'
import { PropsWithChildren } from 'react'
import styles from './Container.module.scss'

export const Container = (props: PropsWithChildren<{}>) => <div className={styles.container}>{props.children}</div>
