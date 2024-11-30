import { Routes, Route} from 'react-router-dom'
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategoriesAsync} from '../../store/categories/categories.action';
import './shop.style.scss'
import CategoriesPreview from '../Routes/categories-preview/categories-preview.component'
import Category from '../Routes/category/category.component';


const Shop= () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, []);

    return (
        
        <Routes>
            <Route index element={<CategoriesPreview />} />
           <Route path=":category" element={<Category/>} />
        </Routes>
      

     );
 };


export default Shop;