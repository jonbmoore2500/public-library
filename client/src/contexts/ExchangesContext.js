import React, {useState, useEffect} from "react"


const ExchangesContext = React.createContext()

function ExchangesProvider({children}) {

    

    return <ExchangesContext.Provider value={{}}>{children}</ExchangesContext.Provider>
}

export {ExchangesContext, ExchangesProvider}