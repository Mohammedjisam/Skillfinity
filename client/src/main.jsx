import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'; 
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId='684692727044-hklbd11suda34kuhmafec1qu1eunrl0p.apps.googleusercontent.com'>
  <App />
  </GoogleOAuthProvider>
</Provider>,
)
