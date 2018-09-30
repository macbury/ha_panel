import React from 'react'
import { container, logo } from './style.scss'
import Loader from '@components/Loader'
import logoUrl from './logo-white.svg'

export default function FullScreenLoader(props) {
  return (
    <div className={container}>
      <img src={logoUrl} className={logo} />
      <Loader />
    </div>
  )
}
