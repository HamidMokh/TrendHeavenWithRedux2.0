import { useState} from 'react'
import './sing-up-form.styles.scss';
import Button from '../button/button.component';
import { createAuthUserWithEmailAndPassword , createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:'',
}

const SignUpForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    
  

 const resetFormFields = ()=>{

   setFormFields(defaultFormFields);

 }; 

    const handleSubmit = async (event)=>{

        event.preventDefault();// we don't want any default behavior of the form,
        // this function is telling the compiler, we will handle all what's gonna happen in the form
        // 1. once the default behavior is prevented we need to confirm that the password matches 
        // 2. check whether the uer is authenticated with email and password with firebase.
        // 3. create a user document from what the authentication result returns
        if (password !== confirmPassword) {

            alert("passwords do not match");
            return;

        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email,password);// when you use this method please make sure to pass it email and password as arguments so it can sent it to firestore to add it there.
            
            await createUserDocumentFromAuth(user,{ displayName });
            resetFormFields();
        } catch (e) {
            if (e.code === 'auth/email-already-in-use'){
                alert('cannot create user, email already in use');
            }
            console.log('user creation encountered an error',e);
        }
 
    } 

    const handleChange = (event)=>{
        const {name, value} = event.target;

        setFormFields({...formFields,[name]:value});
    };

    return(
        <div className='sign-up-container'>
        <h2> Don't have an account?</h2>
        <span> sign up with your email and password </span>

        <form onSubmit={handleSubmit}>

        <FormInput 
        label="Display Name"
        type='text' 
        required 
        onChange={handleChange} 
        name='displayName' 
        value={displayName}
        />

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

       
        <FormInput 
        label ="Confirm Password"
        type='password' 
        required 
        onChange={handleChange} 
        name='confirmPassword' 
        value={confirmPassword}
        />

        <Button  type='submit'>Sign up</Button>

        </form>

        </div>
    );
}

export default SignUpForm;