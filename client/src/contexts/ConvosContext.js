// import React, {useState, useEffect, useContext} from "react"
// import { UserContext } from "./UserContext"

// // import usercontext, assign from user.convos
// // move fetch to userocntext, can still hold in this context
// const ConvosContext = React.createContext()

// function ConvosProvider({children}) {

//     const {user} = useContext(UserContext)

//     const [convos, setConvos] = useState(user.convos)

//     // useEffect(() => {
//     //     fetch("/user_convos").then((r) => {
//     //         if (r.ok) {
//     //             r.json().then((data) => {
//     //                 // console.log("current user", user)
//     //                 setConvos(data)
//     //             })
//     //         }
//     //     })
//     // }, [])


//     return <ConvosContext.Provider value={{convos, setConvos}}>{children}</ConvosContext.Provider>
// }

// export {ConvosContext, ConvosProvider}