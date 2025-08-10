import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Index from './pages/Index.tsx'
import Shop from './pages/Shop.tsx'
import ProductDetails from './pages/ProductDetails.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Cart from './pages/Cart.tsx'
import Admin from './pages/Admin.tsx'
import NotFound from './pages/NotFound.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { ProductsProvider } from './context/ProductsContext.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "admin", element: <Admin /> },
      { path: "*", element: <NotFound /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ProductsProvider>
  </StrictMode>,
)
