import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../assest/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/userSlice";
import { toast } from "react-toastify";

const Header = () => {

  const cartItemsNumber = useSelector((state)=>state.product.cartItem)
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(userData);
  const handleShow = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.clear();
    navigate("/");
    toast.success("User Logout Successfully!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 bg-white z-50">
      <div className="flex items-center h-full justify-between">
        <div className="h-14">
          <img src="https://img.freepik.com/free-vector/free-delivery-logo-with-bike-man-courier_1308-48827.jpg?size=626&ext=jpg&ga=GA1.2.2014209601.1675838600&semt=ais" alt="" className="h-full" />
        </div>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={"/"}>Home</Link>
            <Link to={"/menu/64e72516b9d2b8220fab238c"}>Menu</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"/cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                {cartItemsNumber.length}
              </div>
            </Link>
          </div>
          <div className="text-slate-600">
            <div
              className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md"
              onClick={handleShow}
            >
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" alt="" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === "admin@admin.com" && (
                  <Link
                    to={"/newProduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New Product
                  </Link>
                )}
                {userData.firstName ? (
                  <p
                    onClick={handleLogout}
                    className="cursor-pointer text-white px-2 bg-red-500"
                  >
                    Logout ({userData.firstName})
                  </p>
                ) : (
                  <Link
                    to={"/login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={"/"} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"/menu/64e72516b9d2b8220fab238c"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"/about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"/contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
