import React from 'react'

import UserProvider from './user-provider'

export default ({children}) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}