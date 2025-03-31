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
export default function VehicleCard({ vehicle }) {
  return (
    <div className="shadow-lg flex-col rounded-xl border-gray-300 border-2 h-full flex justify-between overflow-hidden">
      <div className="relative cursor-default">
        {vehicle.hotDeal && (
          <div className="rounded-full absolute bg-gradient-to-br from-lime-600 to-green-600 text-white px-5 py-3 top-5 left-5 hover:bg-gradient-to-tl transition-all">
            Hot Deal!
          </div>
        )}
        <img
          src={`https://greencharge-catalog.s3.us-east-1.amazonaws.com/`+vehicle.image || placeholder}
          alt="placeholder"
          className="aspect-[3/2] object-cover "
        />
      </div>
      <div className="py-4 px-6 space-y-2 cursor-default">
        <h1 className="text-2xl">
          <span>{vehicle.manufacturedYear} </span>
          <span className="font-bold">{vehicle.brand} </span>
          <span>{vehicle.model}</span>
        </h1>
        <h2>
          {vehicle.description.substring(0, 45)}
          {vehicle.description.length > 45 ? "..." : ""}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <h2 className="flex gap-x-1">
            <Speed />
            <span>{vehicle.mileage.toLocaleString()} km</span>
          </h2>
          <h2 className="flex gap-x-1">
            <DirectionsCar />
            {vehicle.body.substring(0, 1).toUpperCase()}
            {vehicle.body.substring(1).toLowerCase()}
          </h2>
          <h2
            className={`${
              vehicle.hasBeenInAccident ? "text-yellow-600" : "text-green-600"
            } flex gap-x-1`}
          >
            {vehicle.hasBeenInAccident ? <CarCrash /> : <NoCrash />}
            {vehicle.hasBeenInAccident ? "Accident" : "None"}
          </h2>
          <h2 className="flex gap-x-1">
            <Inventory />
            {vehicle.quantity > 0 ? `${vehicle.quantity} available` : "Sold out"}
          </h2>
        </div>
      </div>
      <Divider variant="middle" />
      <div className="flex justify-between py-4 px-6 items-center">
        <h2 className="text-2xl cursor-default font-bold">
          $
          {vehicle.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h2>
        <Link
          to={`/vehicles/${vehicle.id}`}
          className="flex text-blue-600 hover:text-blue-800"
        >
          View More <ArrowOutward />
        </Link>
      </div>
    </div>
  );
}
