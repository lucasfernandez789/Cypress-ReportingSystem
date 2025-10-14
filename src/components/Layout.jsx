import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  console.log('Layout component rendering...')

  try {
    console.log('Layout: About to return JSX')
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
  } catch (error) {
    console.error('Error in Layout component:', error)
    console.error('Error stack:', error.stack)
    return (
      <div style={{
        backgroundColor: 'red',
        color: 'white',
        fontSize: '24px',
        padding: '20px',
        minHeight: '100vh'
      }}>
        <h1>🚨 LAYOUT COMPONENT ERROR!</h1>
        <p>Error: {error.message}</p>
        <pre style={{fontSize: '14px'}}>{error.stack}</pre>
      </div>
    )
  }
}

export default Layout