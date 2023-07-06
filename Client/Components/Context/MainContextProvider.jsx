import React, { createContext, useState } from 'react'
export const MainContext = createContext()

function MainContextProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(true)


  const MainContextValues = {
    setAuthenticated,
    authenticated // set True when user is logged in.
  }
  return (
    <MainContext.Provider value={MainContextValues}>
      {children}
    </MainContext.Provider>
  )
}
export default MainContextProvider;



