// import React, {useState, useEffect, useContext} from "react"
// import { UserContext } from "./UserContext"

// const ConvosContext = React.createContext()

// function ConvosProvider({children}) {

//     const {user, setUser} = useContext(UserContext)

//     let convos = user.convos

//     function handleSendMessage(msg) {
//         let updatedConvos = convos.map((c) => {
//             if (msg.conversation_id === c.id) {
//                 c.messages = [...c.messages, msg]
//                 return c
//             }
//             return c
//         })
//         setUser({...user, convos: updatedConvos})
//     }

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


//     return <ConvosContext.Provider value={{convos, handleSendMessage}}>{children}</ConvosContext.Provider>
// }

// export {ConvosContext, ConvosProvider}