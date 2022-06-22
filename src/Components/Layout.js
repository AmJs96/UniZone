import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'

function Layout({ children }) {
  const pathNmae = useLocation();
  return (
    <div>
      {pathNmae !== "/" ? <Header /> : null}
      <div>{children}</div>
    </div>
  )
}

export default Layout