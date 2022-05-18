import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          decodeLab
        </a>
        <span className="ms-1">&copy; 2022 DecodeLab.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          PhotoGraphy &amp; DecodeLab Panel
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
