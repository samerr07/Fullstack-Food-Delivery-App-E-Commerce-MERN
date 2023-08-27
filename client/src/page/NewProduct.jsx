import React, { useState } from 'react'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from "../utility/imagetoBase64";
import { BASEURL } from '../utility/config';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewProduct = () => {

  const [data1,setData1] = useState({
    name:"",
    category:"",
    price:"",
    image:"",
    description:""
  })

  const handleChange = (e)=>{
    const {name,value} = e.target;

    setData1((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  const uploadImage = async(e)=>{
    const data = await ImagetoBase64(e.target.files[0])
    // console.log(data)
    setData1((prev)=>{
      return{
        ...prev,
        image:data
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(data1)
    const {name,category,image,description,price} = data1;
    if(name && category && image && description && price){            
            const {data} = await axios.post(`${BASEURL}/product/uploadProduct`, data1) 
            if(data?.success){
              // console.log(data)
              // alert(data?.message)
              toast.success(data?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                
            } else{
              // alert(data?.message)
              toast.warn(data?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            }
            
    }else{
        // alert("Please fill all fields")
        toast.warn("Please fill all fields", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
    }
    setData1({
      name:"",
      category:"",
      price:"",
      image:"",
      description:""
    })
  }
  return (
    <div className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
      
      <div className='p-4'>
        <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit} >
          <label htmlFor="name">Name</label>
          <input type="text" value={data1.name} onChange={handleChange} name="name" id="" className='bg-slate-200 p-1 my-1'/>

          <label htmlFor='category'>Category</label>
          <select value={data1.category} onChange={handleChange} name="category" className='bg-slate-200 p-1 my-1' id='category'>
            <option >--Select Category--</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Ice-Cream">Ice-Cream</option>
            <option value="Dosa">Dosa</option>
            <option value="Pizza">Pizza</option>
            <option value="Rice">Rice</option>
            <option value="Cake">Cake</option>
            <option value="Burger">Burger</option>
            <option value="Panner">Panner</option>
            <option value="Cusines">Cusines</option>
          <option value="Sandwich">Sandwich</option>
          </select>
            
          
          <label htmlFor="image">Image
          <div className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
            {
              data1.image ? <img src={data1.image} className='h-full' alt="" /> : <span className='text-5xl'><BsCloudUpload/></span>
            }
            <input type="file" accept='image/*' id='image' className='hidden' onChange={uploadImage} />
          </div>
          </label>

          <label htmlFor="price">Price</label>
          <input value={data1.price} type="text" onChange={handleChange} name="price" className='bg-slate-200 p-1 my-1'  id="" />

          <label htmlFor="description">Description</label>
          <textarea value={data1.description} rows="2" className='bg-slate-200 p-1 my-1 resize-none ' onChange={handleChange} name='description'></textarea>

          <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow rounded'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default NewProduct
