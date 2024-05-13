import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';
import './category-preview.styles.scss'


const CategoryPreview = ({ title, products})=>{
return (
   <div className='category-preview-container'>
    <h2>
        <Link className='title' to={title}>{title.toUpperCase()}</Link>
    </h2>
    <div className='preview'>
    {
        products.filter((_, index)=> index <4)  // the undescore is a Placeholder argument for the element being filtered
        // We don't need the product itself in this case, 
        // but keeping the argument maintains proper function syntax
        .map( (product) => (
            <ProductCard key={products.id} product={product}/>
        ))}
    
    </div>
   </div>
)
}



export default CategoryPreview;