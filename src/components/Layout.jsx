import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen bg-gray-100">
      {!isHomePage && (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img className="h-8 w-auto" src="/assets/images/logo-legis-act-D-yCoXSC.png" alt="Logo" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout