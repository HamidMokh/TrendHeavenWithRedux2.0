import {Routes, Route } from 'react-router-dom';
import Home from "./components/Routes/Home/home.component";
import Navigation from './components/Routes/Navigation/navigation.component';
import SignIn from './components/Routes/sign-in/sign-in.component.jsx';
// import CategoryItem from "./components/category-item/category-item.component";


const Shop=  ()=>{
 return <h1>I am the shop component </h1>
}


const App = ()=> {
  
  return (
  <Routes>
  <Route path='/' element={<Navigation/>} >

  <Route index element={ <Home />} />
  <Route path='shop' element={ <Shop /> }/>
  <Route path='sign-in' element={ <SignIn /> }/>
  </Route> 
  </Routes>
  );
}

export default App;