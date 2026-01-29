import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ProductsPage from './pages/ProductsPage'
import AboutUsPage from './pages/AboutUsPage'
import ContactUsPage from './pages/ContactUsPage'
import AdminPage from './pages/AdminPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'about', element: <AboutUsPage /> },
      { path: 'contact', element: <ContactUsPage /> },
      { path: 'admin', element: <AdminPage /> },
      { path: 'product-details', element: <ProductDetailsPage /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
