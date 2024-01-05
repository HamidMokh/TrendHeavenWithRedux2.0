import { signInWithGooglePopup, createUserDocumenFromAuth } from '../../../utils/firebase/firebase.utils';




const SignIn = () =>{

    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        createUserDocumenFromAuth(user);
    };

    return(
        <div>
            <h1> Sign In page </h1>
            <button onClick={logGoogleUser}>Sign In with google pop up</button>
        </div>
    )
}


export default SignIn;