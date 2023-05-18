import React, {useState, useEffect} from "react"

// could incorporate into UserContext, since they all belong to user. keep Library and Messages separate
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

    function handleNewExch(newExch) {
        setExchanges([...exchanges, newExch])
    }

    function handleExchEdit(updatedExch) {
        let newExchanges = exchanges.map((e) => {
            if (e.id === updatedExch.id) {
                return updatedExch
            } 
            return e
        })
        setExchanges(newExchanges)
    }

    return <ExchangesContext.Provider value={{exchanges, setExchanges, handleNewExch, handleExchEdit}}>{children}</ExchangesContext.Provider>
}

export {ExchangesContext, ExchangesProvider}