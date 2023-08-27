import React, { useState } from "react";
import loginImg from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/imagetoBase64";
import axios from "axios";
import {BASEURL} from "./../utility/config"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data1, setData1] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    image:""
  });
  const navigate = useNavigate()

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmShowPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setData1((prev) =>{
        return{
            ...prev,
            [name]:value
        }
    })
  }

  const handleUploadImage = async(e)=>{
    // console.log(e.target.files[0])
    const data = await ImagetoBase64(e.target.files[0])
    setData1((prev)=>{
        return{
            ...prev,
            image:data
        }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {firstName,lastName,email,password,confirmpassword} = data1;
    if(firstName && lastName && email && password && confirmpassword){
        if(password === confirmpassword){
            // alert("Successfull")

            // const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
            //   method : "POST",
            //   headers : {
            //     "content-type" : "application/json"
            //   },
            //   body : JSON.stringify(data)
            // })
  
            // const dataRes = await fetchData.json()

            
            const {data} = await axios.post(`${BASEURL}/user/createUser`, data1) 
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
                navigate("/login")
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
        } else{
            // alert("Password and confirm password not equal")
            toast.warn("Password and confirm password not equal", {
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
  }
  return (
    <div className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
      <div className="p-3 md:p-4">
        <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
          {/* <h1 className='text-center text-2xl font-bold '>Sign Up</h1> */}

          <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
            <img src={data1.image ? data1.image : loginImg} alt="" className="w-full h-full" />

            <label htmlFor="profileImage">
                <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                    <p className="text-sm p-1 text-white">Upload</p>
                </div>
                <input type="file" name="profileImage" accept="image/*" id="profileImage" className="hidden" onChange={handleUploadImage} />
            </label>
          </div>


          <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data1.firstName}
              onChange={handleChange}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data1.lastName}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data1.email}
              onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className=" w-full bg-slate-200 border-none outline-none "
                value={data1.password}
                onChange={handleChange}
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <label htmlFor="confirmpassword">Confirm Password</label>
            <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmpassword"
                name="confirmpassword"
                className=" w-full bg-slate-200 border-none outline-none "
                value={data1.confirmpassword}
                onChange={handleChange}
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleConfirmShowPassword}
              >
                {showConfirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
              Sign up
            </button>
          </form>

          <p className="text-left text-sm mt-2">
            Already have an account ?{" "}
            <Link className="text-red-500 underline" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
