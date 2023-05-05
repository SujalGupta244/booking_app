import React, { createContext, useContext } from 'react'

const context = createContext({})

const UserContext = ({children}) => {
  return (
    <context.Provider value={"hello"}>
        {children}
    </context.Provider>
  )
}

const useGlobalContext = () =>{
    return useContext(context)
}

export {useGlobalContext, UserContext}