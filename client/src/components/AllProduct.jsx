import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeature";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const [filterBy, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const categoryList = [...new Set(productData.map((e) => e.category))];
  // console.log(categoryList)
  const loadingArrayFeature = new Array(10).fill(null);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {

    setFilterBy(category)
    const filter = productData.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase()
    );

    setDataFilter(() => {
      return [...filter];
    });
  };
  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>
      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((e) => (
            //onClick props h
            <FilterProduct
              category={e}
              onClick={() => handleFilterProduct(e)}
              key={e}
              isActive = {e === filterBy}
            />
          ))
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0] ? (
          dataFilter.map((e) => (
            <CardFeature
              key={e._id}
              id={e._id}
              image={e.image}
              name={e.name}
              category={e.category}
              price={e.price}
            />
          ))
        ) : (
          loadingArrayFeature.map((e, i) => (
            <CardFeature loading={"Loading..."} key={i + "AllProduct"} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllProduct;
