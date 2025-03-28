import {
  Speed,
  DirectionsCar,
  CarCrash,
  NoCrash,
  ArrowOutward,
  Inventory,
} from "@mui/icons-material";
import placeholder from "../images/placeholder.png";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
export default function VehicleCard({ car }) {
  return (
    <div className="shadow-lg flex-col rounded-xl border-gray-300 border-2">
      <div className="relative cursor-default">
        {car.hotDeal && (
          <div className="rounded-full absolute bg-gradient-to-br from-lime-600 to-green-600 text-white px-5 py-3 top-5 left-5">
            Hot Deal!
          </div>
        )}
        <img
          src={car.image || placeholder}
          alt="placeholder"
          className="aspect-[3/2] object-cover rounded-t-xl"
        />
      </div>
      <div className="py-4 px-6 space-y-2 cursor-default">
        <h1 className="text-2xl">
          <span>{car.manufacturedYear} </span>
          <span className="font-bold">{car.brand} </span>
          <span>{car.model}</span>
        </h1>
        <h2>
          {car.description.substring(0, 45)}
          {car.description.length > 45 ? "..." : ""}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <h2 className="flex gap-x-1">
            <Speed />
            <span>{car.mileage.toLocaleString()} km</span>
          </h2>
          <h2 className="flex gap-x-1">
            <DirectionsCar />
            {car.body.substring(0, 1).toUpperCase()}
            {car.body.substring(1).toLowerCase()}
          </h2>
          <h2
            className={`${
              car.hasBeenInAccident ? "text-yellow-600" : "text-green-600"
            } flex gap-x-1`}
          >
            {car.hasBeenInAccident ? <CarCrash /> : <NoCrash />}
            {car.hasBeenInAccident ? "Accident" : "None"}
          </h2>
          <h2 className="flex gap-x-1">
            <Inventory />
            {car.quantity > 0 ? `${car.quantity} available` : "Sold out"}
          </h2>
        </div>
      </div>
      <Divider variant="middle" />
      <div className="flex justify-between py-4 px-6 items-center">
        <h2 className="text-2xl cursor-default font-bold">
          $
          {car.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h2>
        <Link
          to={`/vehicles/${car.vid}`}
          className="flex text-blue-600 hover:text-blue-800"
        >
          View More <ArrowOutward />
        </Link>
      </div>
    </div>
  );
}
