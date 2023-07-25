import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { AppContainer } from './app_container/AppContainer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AppContainer>
			<App />
		</AppContainer>
	</React.StrictMode>
)
