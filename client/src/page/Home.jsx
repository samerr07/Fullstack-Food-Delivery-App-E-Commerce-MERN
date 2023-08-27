import React, {  useRef} from "react";
import { useSelector } from "react-redux";
import HomeCard from "../components/HomeCard";
import CardFeature from "../components/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
// import FilterProduct from "../components/FilterProduct";
import AllProduct from "../components/AllProduct";


const Home = () => {

  

  const productData = useSelector((state) => state.product.productList);
  // console.log(productData)

  const homeProductCartList = productData.slice(1, 5);
  // console.log(homeProductCartList);
  const homeProductCartListVegetables = productData.filter(
    (e) => e.category === "Vegetable",
    []
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);
  // console.log(homeProductCartListVegetables)

  const slideProdRef = useRef();

  const prevProduct = () => {
    slideProdRef.current.scrollLeft -= 200;
  };

  const nextProduct = () => {
    slideProdRef.current.scrollLeft += 200;
  };

  

  return (
    <div className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
      <div className="p-2 md:p-4">
        <div className="md:flex gap-4 py-2">
          <div className="md:w-1/2">
            <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
              <p className="text-sm font-medium text-slate-900">
                Bike Delivery
              </p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                alt=""
                className="h-7"
              />
            </div>
            <h2 className="text-4xl md:text-7xl font-bold py-3">
              The Fastest Delivery in{" "}
              <span className="text-red-600 text-">Your Home</span>
            </h2>
            <p className="py-3 text-base ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </p>
            <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
              Order Now
            </button>
          </div>

          <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
            {homeProductCartList[0]
              ? homeProductCartList.map((e) => (
                  <HomeCard
                    key={e._id}
                    id={e._id}
                    image={e.image}
                    name={e.name}
                    price={e.price}
                    category={e.category}
                  />
                ))
              : loadingArray.map((e, i) => (
                  <HomeCard key={i} loading={"Loading...."} />
                ))}
          </div>
        </div>

        <div>
          <div className="flex w-full items-center">
            <h2 className="font-bold text-2xl text-slate-800 mb-4">
              Fresh Vegetables
            </h2>
            <div className="ml-auto flex gap-4">
              <button
                onClick={prevProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              >
                <GrPrevious />
              </button>
              <button
                onClick={nextProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              >
                <GrNext />
              </button>
            </div>
          </div>
          <div
            className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
            ref={slideProdRef}
          >
            {homeProductCartListVegetables[0]
              ? homeProductCartListVegetables.map((e) => (
                  <CardFeature
                    key={e._id}
                    id={e._id}
                    name={e.name}
                    category={e.category}
                    price={e.price}
                    image={e.image}
                  />
                ))
              : loadingArrayFeature.map((e, i) => (
                  <CardFeature loading={"Loading..."} />
                ))}
          </div>
        </div>

        <AllProduct heading={"Your Product"}/>

      </div>
    </div>
  );
};

export default Home;
