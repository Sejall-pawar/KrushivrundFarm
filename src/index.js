import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from "./views/Home/Home"
import About from "./views/About/About"
import Products from "./views/Products/Products"
import Contact from "./views/Contact/Contact"

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
    path: 'products',
    element: <Products/>
  },
  {
    path: 'contact',
    element: <Contact/>
  }
])


root.render(<RouterProvider router={router}/>)