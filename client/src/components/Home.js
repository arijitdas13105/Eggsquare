import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import ProductContainer from './ProductContainer'
import Review from './Review'
import Footer from './Footer'

const Home = () => {
  return (
    <div>

        <Navbar/>
        <Hero/>
        <ProductContainer/>
        <Review/>
        <Footer/>
    </div>
  )
}

export default Home