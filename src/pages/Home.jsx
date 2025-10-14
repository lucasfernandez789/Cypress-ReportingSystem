import React from 'react'
import SeccionPrincipal from '../components/home/SeccionPrincipal'
import TarjetasAcceso from '../components/home/TarjetasAcceso'
import Footer from '../components/common/Footer'

console.log('Home component rendering...')

function Home() {
  console.log('Home function called')
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="container mx-auto flex flex-grow flex-col justify-center px-8 py-12 sm:py-8 md:py-12 xl:h-[70vh] 2xl:py-12">
        <SeccionPrincipal />
        <TarjetasAcceso />
      </div>
      <Footer />
    </div>
  )
}

export default Home