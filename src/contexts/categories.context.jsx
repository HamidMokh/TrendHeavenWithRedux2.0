// important note 1: i used for the first time async functions inside of useEffect, below is the correct way to do it.
import { createContext, useState, useEffect } from "react";
// since the products are changing constantly, it is a good idea to centralize theur state

// import SHOP_DATA from '../shop-data.js' // i imported SHOP_DATA to batch it to firebase

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";


// note 1: the below code is commented, because i used products context in order to get the producs from an internal JSON file.
// now my products live in a database, i will create a new context called CategoriesContext to fit the new logic better.
// export const ProductsContext = createContext ({

//     products:[],

// });

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({children})=>{
  
const [categoriesMap, setCategoriesMap] = useState({});
useEffect(() => {
    const getCategoriesMAP = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap); // Set state after fetching data
    };
    getCategoriesMAP();
  }, []);
const value = { categoriesMap };

return (

    <CategoriesContext.Provider value={ value }> {children} </CategoriesContext.Provider>

)
    
};