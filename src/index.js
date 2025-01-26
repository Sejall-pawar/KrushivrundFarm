import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from "./views/Home/Home"
import About from "./views/About/About"
import Products from "./views/Products/Products"
import Contact from "./views/Contact/Contact"
import Account from "./views/Account/Account"
import Cart from "./views/Cart/Cart"

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter ([
   
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/about',
    element: <About/>
  },
  {
    path: '/products',
    element: <Products/>
  },
  {
    path: '/contact',
    element: <Contact/>
  },
  {
    path: '/account',
    element: <Account/>
  },
  {
    path: '/cart',
    element: <Cart/>
  }
])


root.render(<RouterProvider router={router}/>)