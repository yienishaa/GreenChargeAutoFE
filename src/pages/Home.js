import React from "react";
import background from "../images/background.jpg";
import { ArrowOutward } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="pt-20 w-full flex items-center justify-center">
      <section id="type" className="w-1/2 grid grid-cols-6 items-end">
        <h1 className="text-3xl col-span-5">Browse by Type</h1>
        <Link to="/vehicles" className="col-span-1 text-right">
          <button className="flex items-center justify-end">
            View All <ArrowOutward />
          </button>
        </Link>
        <div className="grid grid-cols-6 col-span-6 mt-4">
          <div className="col-span-3">
            SUV
          </div>
          <div className="col-span-3">
            Sedan
          </div>
          <div className="col-span-2">
            Hatchback
          </div>
          <div className="col-span-2">
            Hybrid
          </div>
          <div className="col-span-2">
            Coupe
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;