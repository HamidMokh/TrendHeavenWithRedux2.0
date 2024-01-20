import { useState } from 'react'
import './sing-in-form.styles.scss';
import Button from '../button/button.component';
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

    // console.log(formFields);

 const resetFormFields = ()=>{

   setFormFields(defaultFormFields);

 }; 

 const signInWithGoogle = async ()=>{// this function signs in the user into firebase + creates a initializer document, it returns the uid + key
    const {user} = await signInWithGooglePopup();

   await createUserDocumenFromAuth(user);
   console.log (user);
};

    const handleSubmit = async (event)=>{

        event.preventDefault();// we don't want any default behavior of the form,
        // this function is telling the compiler, we will handle all what's gonna happen in the form
        // 1. once the default behavior is prevented we need to confirm that the password matches 
        // 2. check whether the uer is authenticated with email and password with firebase.
        // 3. create a user document from what the authentication result returns
      
        try {
           const response  =  await signInAuthUserWithEmailAndPassword(email, password); 
           console.log(response); 
           resetFormFields();
        } catch (e) {
            switch (e.code) {
                case 'auth/wrong-passwrd': 
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
        <Button type = 'buttton' buttonType='google' onClick = {signInWithGoogle} >Google Sign in</Button>
        {/* i siply put type = 'buttton' because when i signed in using buttonType='google it simply considered it as a submit button and submitted the form */}
        </div>
    
        </form>

        </div>
    );
}

export default SignInForm;