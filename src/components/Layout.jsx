import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen bg-gray-100">
      {!isHomePage && (
        <nav className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src="/assets/images/logo-legis-act-D-yCoXSC.png" alt="Logo" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout