import React, {useState, useEffect} from "react"


const ExchangesContext = React.createContext()

function ExchangesProvider({children}) {

    const [exchanges, setExchanges] = useState(null)
    useEffect(() => {
        fetch("/user_exchanges").then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setExchanges(data)
                })
            }
        })
    }, [])

    return <ExchangesContext.Provider value={{exchanges, setExchanges}}>{children}</ExchangesContext.Provider>
}

export {ExchangesContext, ExchangesProvider}