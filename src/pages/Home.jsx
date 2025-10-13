import React from 'react'
import SeccionPrincipal from '../components/home/SeccionPrincipal'
import TarjetaReportes from '../components/home/TarjetaReportes'
import Footer from '../components/common/Footer'

function Home() {
  return (
    <div className="h-screen flex flex-col w-full">
      <div className="flex-grow container mx-auto px-8 py-12 sm:py-8 md:py-12 2xl:py-12 xl:h-[70vh] flex flex-col justify-center">
        <SeccionPrincipal />
        <TarjetaReportes />
      </div>
      <Footer />
    </div>
  )
}

export default Home