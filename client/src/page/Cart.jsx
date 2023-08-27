import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptyCart from "./../assest/empty.gif";
import axios from "axios";
import { BASEURL } from "../utility/config";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const user = useSelector((state) => state.user);
  // console.log(user)
  const navigate = useNavigate()
  const productCartItems = useSelector((state) => state.product.cartItem);
  // console.log(productCartItems)
  const totalPrice = productCartItems.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = productCartItems.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    console.log("button")
    if (user.email) {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );
      const { data } = await axios.post(
        `${BASEURL}/create-checkout-session`,
        productCartItems
      );

      toast.success("Redirect to payment Gateway...!!!");
      stripePromise.redirectToCheckout({ sessionId: data });
    } else {
      toast.warn("Please Login to Checkout !!!")
      navigate("/login")
    }
  };
  return (
    <div className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>

        {productCartItems[0] ? (
          <div className="my-4 flex gap-3">
            {/* Display cart Items  */}

            <div className="w-full max-w-3xl">
              {productCartItems.map((e) => (
                <CartProduct
                  key={e._id}
                  id={e._id}
                  name={e.name}
                  image={e.image}
                  category={e.category}
                  qty={e.qty}
                  total={e.total}
                  price={e.price}
                />
              ))}
            </div>

            {/* Total Cart Items  */}
            <div className="w-full max-w-md ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty:</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price:</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span>
                  {totalPrice}
                </p>
              </div>

              <button
                onClick={handlePayment}
                className="bg-red-500 w-full text-lg font-bold py-2 text-white"
              >
                Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCart} alt="" className="w-full max-w-sm" />
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
