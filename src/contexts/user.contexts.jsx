import { createContext, useEffect, useReducer } from "react";
import {onAuthStateChangedListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";

// the acutual value that i need to access
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
  });

  export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
  };

  const INITIAL_STATE = {
    currentUser: null,
  };

const userReducer = (state, action) =>{
    console.log('dispatched!')
    console.log(action);
    const { type, payload } = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER: 
        return    { ...state, currentUser: payload};
        default: 
        throw new Error (`Unhandled type ${type} in userReducer`);
    }
};


export const UserProvider = ({children})=> {
    // const [currentUser, setCurrentUser] = useState(null);
    const [{ currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    // console.log(currentUser);
    //we can also write const { currentUser}=state, or distructer directly like above.
    
    const setCurrentUser = (user) => 
        // dispatch ({type: USER_ACTION_TYPES.SET_CURRENT_USER, currentUser: user});  -> this was wrong i used current user instead of payload is is wierd that i worked for others
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=> {
            if (user){
                createUserDocumentFromAuth(user);
            }
           setCurrentUser(user);
        })

        return unsubscribe
    },[]);
    const value = {
        currentUser,
    };
  
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

