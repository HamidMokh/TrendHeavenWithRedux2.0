import { createContext, useState, useEffect } from "react";

import {onAuthStateChangedListener, createUserDocumenFromAuth} from "../utils/firebase/firebase.utils"

// the acutual value that i need to access
export const UserContext = createContext({
currentUser : null,
setCurrentUser : ()=> null,
});


export const UserProvider = ({children})=> {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=> {
            if (user){
                createUserDocumenFromAuth(user);
            }
           setCurrentUser(user);
        })

        return unsubscribe
    },[])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
