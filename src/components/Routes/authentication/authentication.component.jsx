// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'// inn the newer verions getredirect result is included in firebase/auth path not / redirect( i didn't check if ./ redirect is valid anymore )

// import { 
//     auth,
//     signInWithGooglePopup,
//     signInWithGoogleRedirect,
//     createUserDocumenFromAuth 
// } from '../../../utils/firebase/firebase.utils';
import './authentication.styles.scss'
import SignUpForm from '../../sign-up-form/sign_up_form.component'
import SignInForm from '../../sign-in-form/sign_in_form.component';
const Authentication = () =>{
// useEffect(()=>{
// const toUseEffectAsynchronously =    async () =>{// run useEffect when the SignIn component is Mounted
//    const response = await getRedirectResult(auth);
//    if(response){
//     const userDocRef = await createUserDocumenFromAuth(response.user);
//    }
//     } 
//     toUseEffectAsynchronously();
// }, []); // passing an empty array means run useEffect once, only hwen the signin component is mouned in the DOM.
    return(
        <div className='authentication-container'>
            
            {/* <button onClick={logGoogleUser}>Sign In with google pop up</button> */}
            {/* <button onClick={signInWithGoogleRedirect}>Sign In with google redirect</button> */}
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication;