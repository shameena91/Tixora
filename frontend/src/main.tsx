import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Toaster position="top-right" 
        toastOptions={{
    style: {
      background: "#FFFFFF",
      color: "#24113F",
      border: "1px solid #E5E7EB",
      borderRadius: "12px",
      padding: "12px 16px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      fontSize: "14px",
      fontWeight: "500",
    },
  }}
  />
    <App />
  </StrictMode>,
)
