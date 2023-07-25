import React from 'react';
import { PropsWithChildren } from 'react';
import styles from './AppContainer.module.scss';

export const AppContainer = (props: PropsWithChildren<{}>) => (
   <div className={styles.container}>{props.children}</div>
);
