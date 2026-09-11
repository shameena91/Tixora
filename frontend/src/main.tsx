import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './modules/auth/context/AuthProvider.tsx';
import { store } from './redux/store/store.ts';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Toaster
          position="top-right"
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
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
