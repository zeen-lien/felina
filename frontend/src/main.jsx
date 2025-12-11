/**
 * FabricFlow - Entry Point Aplikasi
 * File ini adalah titik masuk utama aplikasi React
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Render aplikasi ke DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/felina">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
