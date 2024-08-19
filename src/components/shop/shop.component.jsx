import { Routes, Route} from 'react-router-dom'
import { useEffect} from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/categories/categories.action';
import './shop.style.scss'
import CategoriesPreview from '../Routes/categories-preview/categories-preview.component'
import Category from '../Routes/category/category.component';


const Shop= () => {
    const dispatch = useDispatch();

    useEffect(() => {
      const getCategoriesMap = async () => {
        const categoriesArray = await getCategoriesAndDocuments('categories');
        dispatch(setCategories(categoriesArray));
      };
      getCategoriesMap();
    }, []);

    return (
        
        <Routes>
            <Route index element={<CategoriesPreview />} />
           <Route path=":category" element={<Category/>} />
        </Routes>
      

     );
 };


export default Shop;