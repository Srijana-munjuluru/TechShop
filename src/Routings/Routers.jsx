import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Cart from '../components/Cart'
import AllProducts from '../components/AllProducts'
import ProductDetails from "../components/ProductDetails";

const Routers = () => {
  return (
    <>
        <Routes>
            <Route path='/' element= {<Home />}/>
            <Route path="/cart" element={<Cart />} />
            <Route path='/products' element={<AllProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
    </>
    
  )
}

export default Routers