import React from 'react'
import { useLocation } from 'react-router-dom'
import LogoHeader from './LogoHeader'
function Layout2({children}) {
    const pathName = useLocation();
  return (
      
    <div>
      {pathName !== "/" ? <LogoHeader /> : null}
      <div>{children}</div>
    </div>
  )
}

export default Layout2