import DirectoryItem from '../directory-item/directory-item.component';
import './category.styles.scss'



const CategoryDirectory = ({categories})=>{

return (
<div className="categories-container" >
  
  {categories.map((category)=>{
  return <DirectoryItem category={category} />
  })}
  
</div>)
};

export default CategoryDirectory;