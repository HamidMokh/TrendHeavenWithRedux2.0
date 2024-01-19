// 1 Importing necessary Firebase modules
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,// firebase/auth gives us different providers other then google, such as FacebookAuthProvider, GithubAuthProvider... ext 
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {getFirestore, 
    doc,
    getDoc,
    setDoc,} from 'firebase/firestore' // 2 importing necessary Firebase methods to use the firestore (meanning the importing methods to use he db)
    

// 1 Configuration to link this Firebase instance to the online app "trend-heaven"
// 1 Note: This configuration is obtained from the Firebase Console (https://console.firebase.google.com/project/trend-heaven/overview)
const firebaseConfig = {
  apiKey: "AIzaSyAh7n66GZCNt4T3sDT6Rfy-1iIE2snQluU",
  authDomain: "trend-heaven.firebaseapp.com",
  projectId: "trend-heaven",
  storageBucket: "trend-heaven.appspot.com",
  messagingSenderId: "188851868694",
  appId: "1:188851868694:web:e1b62eef134a6479021137"
};


// 1 Initialize Firebase with the provided configuration
const firebaseApp = initializeApp(firebaseConfig);
// 1  Why: Initializes the Firebase app with the provided configuration.
//1  How: Calls the `initializeApp` function with the provided `firebaseConfig`.

// 1 Creating a GoogleAuthProvider instance for Google Sign-In
const GoogleProvider = new GoogleAuthProvider();
// Why: Enables authentication using Google accounts.
// How: Instantiates a new `GoogleAuthProvider`.

// 1 Customizing the authentication parameters to prompt user account selection
GoogleProvider.setCustomParameters({
  prompt: 'select_account',
});
// 1 Why: Customizes the Google Sign-In process to prompt the user to select their Google account.
// 1 How: Calls `setCustomParameters` on the `GoogleAuthProvider` instance.

// 1 Exporting the Firebase authentication instance
export const auth = getAuth();
//1  Why: Provides access to Firebase Authentication functionalities.
//1  How: Calls `getAuth` to obtain the authentication instance.

//1  Exporting a function to sign in with Google using a popup
export const signInWithGooglePopup = () => signInWithPopup(auth, GoogleProvider);
//1  Why: Allows users to sign in using their Google accounts through a popup.
//1  How: Calls `signInWithPopup` on the authentication instance (`auth`) with the `GoogleAuthProvider` (`provider`).
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, GoogleProvider);
export const db = getFirestore(); // 2 second step is initiating the fireStore db by declaring the getFireStore method, please note that google call their firebase db fireStore.

export const createUserDocumenFromAuth = async (userAuth,
   additionalInformation ={}// note that this is nested and assigned an empty object value as default inside createUserDocumentFromAuth
   // it is perfectly valid for js to initiate an object that you are passing as an argument
   //inside of a function 
   ) =>{
 const userDocRef = doc(db, 'users', userAuth.uid);

 console.log(userDocRef);

 const userSnapshot = await getDoc(userDocRef);

 console.log(userSnapshot);
 console.log(userSnapshot.exists());

if(!userSnapshot.exists()){
    const {displayName, email} =userAuth;
    const createdAt = new Date();

    try{

        await setDoc(
            userDocRef,
            {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        

    }catch(error){
console.log('error creating the user', error.message);
    }

}

return userDocRef;

};

//note: we are using export so we can use the db configuraion by importing it at any file in this project.

 export const createAuthUserWithEmailAndPassword = async (email, password)=>{
 if(!email||!password) return;

 return await createUserWithEmailAndPassword(auth, email, password)

}