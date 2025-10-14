import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  console.log('Layout component rendering...')

  return (
    <div style={{
      backgroundColor: 'orange',
      color: 'black',
      fontSize: '18px',
      padding: '10px',
      minHeight: '100vh'
    }}>
      <h1>📐 LAYOUT COMPONENT</h1>
      <p>If you see this, Layout is working.</p>
      <div style={{
        backgroundColor: 'yellow',
        padding: '10px',
        margin: '10px 0',
        border: '2px solid black'
      }}>
        <h2>Content Area:</h2>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout