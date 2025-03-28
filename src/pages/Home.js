import React from "react";
import { Link } from "react-router-dom";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import CategoryCard from "../components/CategoryCard";

import suv from "../images/suv.png";
import sedan from "../images/sedan.png";
import hatchback from "../images/hatchback.png";
import hybrid from "../images/hybrid.png";
import coupe from "../images/coupe.png";
import loan from "../images/loan.png";
import placeholder from "../images/placeholder.png";

const Home = () => {
  const categories = [
    { image: suv, category: "SUV", span: "big" },
    { image: sedan, category: "Sedan", span: "big" },
    { image: hatchback, category: "Hatchback", span: "small" },
    { image: hybrid, category: "Hybrid", span: "small" },
    { image: coupe, category: "Coupe", span: "small" },
  ];

  return (
    <div className="pb-10 w-full flex flex-col items-center justify-center gap-y-10">
      <section id="featured" className="w-full max-h-lvh flex relative overflow-y-hidden">
        <img src={placeholder} alt="bmw" className="h-full object-center" />
      </section>
      <section id="type" className="w-2/3 grid grid-cols-6 items-end">
        <h1 className="text-4xl col-span-5 text-lime-700 font-semibold">Browse by Type</h1>
        <Link to="/vehicles" className="col-span-1 text-right flex justify-end">
          <button className="flex items-center text-lime-700 hover:text-lime-900">
            View All <ArrowOutward />
          </button>
        </Link>
        <div className="grid grid-cols-6 col-span-6 gap-2 mt-4">
          {categories.map(({ image, category, span }, index) => (
            <div
              key={index}
              className={span === "big" ? "col-span-3" : "col-span-2"}
            >
              <CategoryCard image={image} category={category} />
            </div>
          ))}
        </div>
      </section>
      <section id="loan" className="w-full px-20">
        <div className="bg-lime-100 rounded-xl justify-center grid grid-cols-2">
          <div
            id="left"
            className="flex align-middle items-center justify-center text-lime-700"
          >
            <div className="gap-y-5 flex flex-col w-2/3">
              <h1 className="text-4xl font-semibold">Auto Loan Calculator</h1>
              <h3 className="text-md">
                Use this calculator to estimate monthly payments on your next
                new or used auto loan.
              </h3>
              <Link to="/loan">
                <button className="w-full bg-green-500 text-white text-xl flex items-center justify-center py-5 rounded-2xl hover:brightness-90">
                  Calculate <ArrowOutward />
                </button>
              </Link>
            </div>
          </div>
          <div id="right">
            <img src={loan} alt="loan" className="object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
