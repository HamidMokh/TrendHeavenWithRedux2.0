import { useState } from 'react'
import './sing-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { signInWithGooglePopup ,
     createUserDocumenFromAuth ,
     signInAuthUserWithEmailAndPassword
    } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;


 const resetFormFields = ()=>{

   setFormFields(defaultFormFields);

 }; 

                                                                                            // >>>>> the function below signs in the user into firebase + creates a initializer document, it returns the uid + key

 const signInWithGoogle = async ()=>{                   
   await signInWithGooglePopup();
 };

   const handleSubmit = async (event)=>{
                                                                                            // the below function prevent default is added because we don't want any default behavior of the form,
                                                                                            // this function is telling the compiler, we will handle all what's gonna happen in the form
                                                                                            // 1. once the default behavior is prevented we need to confirm that the password matches 
                                                                                            // 2. check whether the uer is authenticated with email and password with firebase.
                                                                                            // 3. create a user document from what the authentication result returns
        event.preventDefault();
        try {
           const { user }  =  await signInAuthUserWithEmailAndPassword(email, password); 
           resetFormFields();
           
        } catch (e) {
            switch (e.code) {
                case 'auth/wrong-password': 
                    alert('incorrect password or email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(e.code);
            }
        }
            
    } 

    const handleChange = (event)=>{
        const {name, value} = event.target;

        setFormFields({...formFields,[name]:value});
    };

    return(
        <div className='sign-in-container'>
        <h2> Already have an account?</h2>
        <span> sign in with your email and password </span>

        <form onSubmit={handleSubmit}>

        <FormInput 
        label="Email" 
        type='email' 
        required 
        onChange={handleChange} 
        name='email' 
        value={email}
        />

      
        <FormInput 
        label="Password" 
        type='password'  
        required onChange={handleChange} 
        name='password'
        value={password}
        />
       
        <div className='buttons-container'>
        <Button  type='submit'>Sign in</Button>
        <Button type = 'button' buttonType={BUTTON_TYPE_CLASSES.google} onClick = {signInWithGoogle} >Google Sign in</Button>
                                                                                                                                            {/* i siply put type = 'buttton' because when i signed in using buttonType='google it simply considered it as a submit button and submitted the form */}
        </div>
    
        </form>

        </div>
    );
}

export default SignInForm;