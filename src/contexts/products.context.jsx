import { createContext, useState } from "react";
// since the products are changing constantly, it is a good idea to centralize theur state

import PRODUCTS from '../shop-data.json'



export const ProductsContext = createContext ({

    products:[],

});

export const ProductsProvider = ({children})=>{
  
const [products, setProducts] = useState(PRODUCTS);
const value = { products };

return (

    <ProductsContext.Provider value={ value }> {children} </ProductsContext.Provider>

)
    
};