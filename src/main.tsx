import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthContextProvider from './context/AuthContext.tsx'
import ProjectAndUserProvider from './context/ProjectAndUserContext.tsx'
import DarkModeProvider from './context/DarkMode.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <DarkModeProvider>
        
      <ProjectAndUserProvider>
    <App  />

      </ProjectAndUserProvider>
      </DarkModeProvider>
    </AuthContextProvider>
  </StrictMode>,
)
