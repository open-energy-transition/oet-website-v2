import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard  = () => {
  return (
    <div className={baseClass}>
      <img  
      src="/favicon.svg"
        alt="OET Logo"
        
      />
        <h4 >Welcome to OET Website dashboard!</h4>
      
      </div>
     
  )
}

export default BeforeDashboard
