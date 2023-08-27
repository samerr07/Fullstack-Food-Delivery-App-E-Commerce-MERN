import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./page/Home"
import Menu from "./page/Menu"
import About from "./page/About"
import Contact from "./page/Contact"
import Login from "./page/Login";
import NewProduct from "./page/NewProduct";
import SignUp from "./page/SignUp";
import { useEffect } from "react";
import axios from "axios";
import { BASEURL } from "./utility/config";
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from "./redux/productSlice";
import Cart from "./page/Cart";
import Success from "./page/Success";
import Cancel from "./page/Cancel";


function App() {

  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)

  useEffect(()=>{
    (async()=>{
      const {data} = await axios.get(`${BASEURL}/product/getProduct`)
      // console.log(data.products)
      dispatch(setDataProduct(data.products))
    })()
  },[])
  // console.log(productData)

  return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/menu" element={<Menu/>} /> */}
          <Route path="/menu/:id" element={<Menu/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/newProduct" element={<NewProduct/>} />
          <Route path="/signUp" element={<SignUp/>} /> 
          <Route path="/cart" element={<Cart/>} />
          <Route path="/success" element={<Success/>} />
          <Route path="/cancel" element={<Cancel/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
