// src/pages/VehicleDetail.js

import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import placeholder from "../images/placeholder.png";
import { AddCircle, AddShoppingCart, RemoveCircle } from "@mui/icons-material";
import Stars from "../components/Stars";
const VehicleDetail = () => {
  const { id } = useParams(); // Get the vehicle id from the URL
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeColor, setActiveColor] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/vehicles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVehicle(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen justify-center items-center flex">
        Error: {error}
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="h-screen justify-center items-center flex">
        No vehicle found
      </div>
    );
  }

  // Function to count occurrences of each color
  const countColors = (colors) => {
    return colors.reduce((acc, color) => {
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {});
  };

  const averageRating = (reviews) => {
    let sum = 0;
    let count = 0;
    reviews.forEach((review) => {
      sum += review.stars;
      count += 1;
    });
    const avg = sum / count;
    return avg;
  };

  const colorCounts = countColors(vehicle.colors);

  const addToCart = () => {};

  return (
    <div className="h-screen pt-28 justify-center flex">
      <div className="w-2/3 space-y-5">
        <Divider variant="" textAlign="left" sx={{}}>
          <div>
            <Link to={"/"} className="text-lime-700 hover:brightness-90">
              Home
            </Link>{" "}
            /{" "}
            <Link
              to={"/vehicles"}
              className="text-lime-700 hover:brightness-90"
            >
              Vehicles
            </Link>{" "}
            / {vehicle.manufacturedYear} {vehicle.brand} {vehicle.model}
          </div>
        </Divider>

        <h1 className="text-4xl">
          {vehicle.manufacturedYear} {vehicle.brand} {vehicle.model}
        </h1>
        <div className="grid grid-cols-3 rounded-xl overflow-hidden">
          <img
            src={vehicle.image || placeholder}
            alt="car"
            className="h-full object-cover col-span-2"
          />
          <div className="grid grid-rows-5 pb-5 w-full border-gray-200 border-2 border-l-0 rounded-r-xl px-6 py-1 gap-y-2">
            <span className="w-full flex flex-col justify-end h-full">
              <h2 className="text-right text-gray-400">
                Vehicle ID: {vehicle.vid}
              </h2>
            </span>
            <span className="w-full justify-between flex">
              <h1 className="text-3xl text-gray-700">Price:</h1>
              <h1 className="text-4xl">
                $
                {vehicle.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
            </span>
            {/* <span className="grid grid-cols-3 align-middle items-end">
              <h1 className="text-3xl text-gray-700">Qty:</h1>
              <span className="col-span-2 justify-between flex align-middle space-x-1">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className={
                    quantity > 1 ? "text-black" : "text-gray-500 cursor-default"
                  }
                >
                  <RemoveCircle fontSize="large" />
                </button>
                <h2 className="text-xl bg-lime-100 border-2 rounded-xl py-1 px-12">
                  {quantity}
                </h2>
                <button
                  onClick={() =>
                    quantity < vehicle.quantity && setQuantity(quantity + 1)
                  }
                  className={
                    quantity < vehicle.quantity
                      ? "text-black"
                      : "text-gray-500 cursor-default"
                  }
                >
                  <AddCircle fontSize="large" />
                </button>
              </span>
            </span> */}
            <span className="row-span-2">
              <h2 className="text-lg font-semibold py-2">Available Colors:</h2>
              <ul className="grid grid-cols-4 gap-y-2">
                {Object.entries(colorCounts).map(([color, count]) => (
                  <li
                    key={color}
                    style={{
                      backgroundColor: color,
                    }}
                    className={`${
                      color === "white" || color === "yellow"
                        ? "text-black"
                        : "text-white"
                    } ${
                      activeColor === color && "brightness-75"
                    } rounded-full w-10 h-10 font-bold items-center flex justify-center cursor-pointer`}
                    onClick={() => setActiveColor(color)}
                  >
                    ×{count}
                  </li>
                ))}
              </ul>
            </span>
            <button
              className="w-full py-3 bg-green-600 rounded-xl text-xl text-white hover:brightness-90 space-x-2 flex items-center justify-center"
              onClick={() => averageRating(vehicle.reviews)}
            >
              <span>
                <AddShoppingCart />
              </span>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
        <p>{vehicle.description}</p>
        <div>
          <div className="flex justify-between my-2">
            <h2 className="text-3xl">Reviews</h2>
            <div className="flex gap-x-5">
              <Stars rating={averageRating(vehicle.reviews)} />
              <p className="text-xl font-semibold">
                Average Rating: {averageRating(vehicle.reviews).toFixed(1)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            {vehicle.reviews.map((review) => (
              <div className="m-3 border-2 p-3 rounded-xl">
                <h1 className="font-bold text-xl">{review.author}</h1>
                <Stars rating={review.stars} />
                {review.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
