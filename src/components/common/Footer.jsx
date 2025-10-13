import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-8 text-center text-gray-600">
        Sistema de Reportes de Testing - {new Date().getFullYear()}
      </div>
    </footer>
  )
}

export default Footer