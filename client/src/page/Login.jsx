import React, { useEffect, useState } from "react";
import loginImg from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "./../utility/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/userSlice";

const Login = () => {
  const user = useSelector((state) => state.user);
  console.log(user)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [data1, setData1] = useState({
    email: "",
    password: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData1((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data1;

    if (email && password) {
      try {
        const { data } = await axios.post(`${BASEURL}/user/login`, data1);
        console.log(data)
        if (data?.success) {
          localStorage.setItem("token", data.token);
         
          dispatch(loginAction(data));
          toast.success(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/");
          console.log(user)
        } else {
          toast.error(data.message, {
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
      } catch (err) {
        toast.error(err.message, {
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
    } else {
      alert("Please fill all fields");
    }
  };



  return (
    <div className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
      <div className="p-3 md:p-4">
        <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
          {/* <h1 className='text-center text-2xl font-bold '>Sign Up</h1> */}

          <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
            <img src={loginImg} alt="" className="w-full" />
          </div>

          <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
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

            <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
              Login
            </button>
          </form>

          <p className="text-left text-sm mt-2">
            Don't have an account ?{" "}
            <Link className="text-red-500 underline" to={"/signUp"}>
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

