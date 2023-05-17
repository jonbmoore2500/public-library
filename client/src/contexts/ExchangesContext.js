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

    function handleExchEdit(updatedExch) {
        let newExchanges = exchanges.map((e) => {
            if (e.id === updatedExch.id) {
                return updatedExch
            } 
            return e
        })
        setExchanges(newExchanges)
    }

    return <ExchangesContext.Provider value={{exchanges, setExchanges, handleExchEdit}}>{children}</ExchangesContext.Provider>
}

export {ExchangesContext, ExchangesProvider}