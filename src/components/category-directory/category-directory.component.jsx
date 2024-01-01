import CategoryItem from '../category-item/category-item.component';
import './categories.styles.scss'



const CategoryDirectory = ({categories})=>{

return (
<div className="categories-container" >
  
  {categories.map((category)=>{
  return <CategoryItem category={category} />
  })}
  
</div>)
};

export default CategoryDirectory;