import React from 'react'
import Carousel from './Carousel'
import Slides from './Slides'
import ProdCards from './ProdCards'
import Services from './Services'

const Home = () => {
  return (
    <>
      <Carousel />
      <Slides />
      <ProdCards />
      <Services />
    </>
  )
}

export default Home