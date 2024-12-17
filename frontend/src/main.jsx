import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store.js';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import LoginScren from "./screens/LoginScreen.jsx"
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/shippingScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path="/" element={<HomeScreen/>}/>
      <Route path="/product/:id" element={<ProductScreen/>}/>
      <Route path="/cart" element={<CartScreen/>}/>
      <Route path="/login" element={<LoginScren/>}/>
      <Route path="/register" element={<RegisterScreen/>}/>
      <Route path="/shipping" element={<ShippingScreen/>} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
