                                                                                                      // 1 Importing necessary Firebase modules
                                                                                                      // important note, i have created a utils files firebase.utils.js to put all of firebase functions in one place to mimimize the impact on my codebase if changes happen in firebase 
import { initializeApp } from 'firebase/app';
import {
        getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,                                                                           // firebase/auth gives us different providers other then google, such as FacebookAuthProvider, GithubAuthProvider... ext 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
} from 'firebase/auth';

import {getFirestore, 
        doc,
        getDoc,
        setDoc,
        collection,                                                                                   // when we used userdocref function firebase created for us users collection, now to create different doc refs it is better to use collection function. line 64
        writeBatch,
        query,
        getDocs
} from 'firebase/firestore'                                                                          // 2 importing necessary Firebase methods to use the firestore (meanning the importing methods to use he db)  
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
export const db = getFirestore();                                                           // 2 second step is initiating the fireStore db by declaring the getFireStore method, please note that google call their firebase db fireStore.

                                                                                          // This function adds a collection of documents to a specific Firestore collection,
                                                                                          // extending the functionality of the application.

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
                                                                                             // 1. Connect to Firestore and Target the Collection:
      //    - Retrieve a reference to the Firestore collection using the provided collectionKey.
      //    - This collectionKey argument specifies the exact collection name within your database.
    const collectionRef = collection(db, collectionKey);
                                                                                             // 2. Optimize for Efficiency with Batch Writing:
       //    - Create a batch object using writeBatch(db). This allows for efficient writing
       //    - of multiple documents at once. Instead of sending individual requests for each object,
      //    - we can group them and send them as a single operation, improving performance.
    const batch = writeBatch(db);

                                                                                            // 3. Iterate Through Objects and Add Them to Firestore:
    //    - Loop through each object within the objectsToAdd array.
    objectsToAdd.forEach((object) => {
                                                                                            //    - Inside the loop:
          //      - Create a reference to a new document within the collection (`collectionRef`).
          //      - Ensure the object's title is converted to lowercase using object.title.toLowerCase().
          //      - This might be useful for generating document IDs or for easier searching later.
          const docRef = doc(collectionRef, object.title.toLowerCase());

                                                                                            //      - Add the current object to the batch. This associates the object data
                                                                                            //      - with the newly created document reference (`docRef`). Essentially, we tell Firebase
                                                                                            //      - to store this object's data as a document in the specified collection.
          batch.set(docRef, object);
       
     });

                                                                                              // 4. Commit the Batch of Document Writes:
                                                                                              //    - After iterating through all objects, wait for the entire batch of document writes
                                                                                              //    - to be committed to Firestore as a single operation using await batch.commit().
        await batch.commit();

                                                                                            // 5. Completion Message (Optional):
                                                                                            //    - Log a message to the console indicating successful completion (optional).
          console.log("done");
};


                                                                                          // This function retrieves categories and their associated items from a Firestore collection,
                                                                                          // potentially for populating your React application's UI or managing data.
export const getCategoriesAndDocuments = async () => {
 // 1. Target the Firestore Collection:
const collectionRef = collection(db, 'categories');
                                                                                        
// 2. Construct a Firestore Query (Optional):
const q = query(collectionRef);
                                                                                        
 // 3. Retrieve Data from Firestore:
 const querySnapshot = await getDocs(q);
                                                                                        
// 4. Process and Structure the Data:
return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //                                                                                     //    - Inside the reduce callback function:
  //                                                                                     //      - Extract the "title" and "items" fields from the current document's data.
  //   const { title, items } = docSnapshot.data();

  //                                                                                   //      - Create a lowercase version of the title for potential case-insensitive handling.
  //   const lowerCaseTitle = title.toLowerCase();

  //                                                                                     //      - Add the "items" array associated with the category title to the accumulator (`acc`).
  //                                                                                     //      - The accumulator (`acc`) is essentially building a new object where keys are
  //                                                                                     //      - lowercase titles and values are the corresponding items arrays.
  //   acc[lowerCaseTitle] = items;

  //                                                                                       //      - Return the updated accumulator to be used in the next iteration of reduce().
  //   return acc;
  // }, {});

                                                                                                // 5. Return the Processed Data:
                                                                                                //    - After processing all categories, return the final `categoryMap` object.
                                                                                                //    - This object has category titles (lowercase) as keys and their corresponding items arrays as values.
  // return categoryMap;



export const createUserDocumentFromAuth = async (userAuth,
      additionalInformation ={}                                                                 //// >>>>>> note that this is nested and assigned an empty object value as default inside createUserDocumentFromAuth it is perfectly valid for js to initiate an object that you are passing as an argument inside of a function 
      ) =>{
          const userDocRef = doc(db, 'users', userAuth.uid);

          // console.log(userDocRef);

          const userSnapshot = await getDoc(userDocRef);

          // console.log(userSnapshot);
          // console.log(userSnapshot.exists());

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
                                                                                        //The below code represent interface layers

 export const createAuthUserWithEmailAndPassword = async (email, password)=>{
 if(!email||!password) return;

 return await createUserWithEmailAndPassword(auth, email, password)

}

export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email||!password) return;
 
  return await signInWithEmailAndPassword(auth, email, password)
 
 }

 export const signOutUser =  async()=> await signOut(auth);



 export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth , callback);