import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SearchBar from './components/SearchBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchBar />
  </StrictMode>,
)
