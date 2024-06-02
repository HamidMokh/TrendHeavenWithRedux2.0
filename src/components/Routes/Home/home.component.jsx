import { Outlet } from 'react-router-dom'
import CategoryDirectory from "../../../components/category-directory/category-directory.component";

// import CategoryItem from "./components/category-item/category-item.component";

const Home = ()=> {
  
  return (
    <div>
    
    <CategoryDirectory/> 
    <Outlet/>
    </div>
    
  );
}

export default Home;