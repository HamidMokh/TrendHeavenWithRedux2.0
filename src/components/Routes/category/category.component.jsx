import { useState, useEffect, Fragment} from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../../store/categories/categories.selector';
import { useParams } from 'react-router-dom';
import ProductCard from '../../product-card/product-card.component';
import './category.style.scss'

const Category =()=>{

    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [ products, setProducts] = useState(categoriesMap[category]);
    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap]);

    return (
        <Fragment>
        <h2 className='category-title'>{category.toLocaleUpperCase()}</h2>
        <div className='category-container'>
           
            {products &&
                products.map((product) => <ProductCard key={product.id} product={product} /> )
            }
        </div>
        </Fragment>
    )

}

export default Category;