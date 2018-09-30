require('./styles/index.scss')

import React from 'react'
import ReactDOM from 'react-dom'

import AppProvider from '@containers/AppProvider'
import AuthRequired from '@containers/AuthRequired'
import FetchStates from '@containers/FetchStates'
import Pages from '@containers/Pages'

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root')
  ReactDOM.render(
    <AppProvider>
      <AuthRequired>
        <FetchStates>
          <Pages />
        </FetchStates>
      </AuthRequired>
    </AppProvider>,
    rootEl,
  )
})
