import DirectoryItem from '../directory-item/directory-item.component';
import { CategoriesContainer } from './category.styles';



const CategoryDirectory = ({categories})=>{

return (
<CategoriesContainer >
  
  {categories.map((category)=>{
  return <DirectoryItem category={category} />
  })}
  
</CategoriesContainer>)
};

export default CategoryDirectory;