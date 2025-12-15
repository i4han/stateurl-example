import './stateurl-types' // Module augmentation for type-safe routing
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './main.css'

const root = document.getElementById('root')

if (!root) {
    throw new Error('No #root element found')
}

createRoot(root).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
