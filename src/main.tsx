import React from 'react'
import ReactDOM from 'react-dom'
import { WrappedApp } from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
)
