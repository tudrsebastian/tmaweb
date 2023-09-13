import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AppLayout } from './layouts/index.tsx'
import { MantineGlobalProvider } from './providers/index.tsx'
import { NavigationProgress } from '@mantine/nprogress';
import { BrowserRouter } from "react-router-dom"
ReactDOM.createRoot(document.getElementById('root')!).render(

  <MantineGlobalProvider>
    <NavigationProgress />
    <AppLayout>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppLayout>
  </MantineGlobalProvider>

)
