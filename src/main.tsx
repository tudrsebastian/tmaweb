import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AppLayout } from './layouts/index.tsx'
import { MantineGlobalProvider } from './providers/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineGlobalProvider>
      <AppLayout>
        <App />
      </AppLayout>
    </MantineGlobalProvider>
  </React.StrictMode>,
)
