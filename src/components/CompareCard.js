import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { CarCrash, DirectionsCar, NoCrash, Speed } from "@mui/icons-material";
import { useState } from "react";
import Stars from "./Stars";

export default function CompareCard({ vehicles }) {
  const [activeVehicle, setActiveVehicle] = useState(0.0);
  const [vehicle, setVehicle] = useState(0);
  const [rating, setRating] = useState(0);

  const updateVehicle = (id) => {
    setActiveVehicle(id);
    fetch(`http://localhost:8080/vehicles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVehicle(data);
        
            let sum = 0;
            let count = 0;
            data.reviews.forEach((review) => {
              sum += review.stars;
              count += 1;
            });
            const avg = (sum / count).toFixed(2);
            setRating(parseFloat(avg));
          
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

 
  return (
    <div className="w-full space-y-5">
      <FormControl sx={{ minWidth: 300, width: "100%" }} size="small">
        <InputLabel id="choose-label" sx={{ color: "black" }}>
          Select Vehicle
        </InputLabel>
        <Select
          labelId="choose-label"
          id="toCompare"
          value={activeVehicle}
          label="Choose Vehicle"
          onChange={(event) => updateVehicle(event.target.value)}
          sx={{ minWidth: 300, width: "100%" }}
        >
          {vehicles &&
            vehicles.map((vehicle) => {
              console.log(vehicle);
              return (
                <MenuItem
                  key={vehicle.id}
                  value={vehicle.id}
                  className="space-x-1 "
                >
                  <p className="w-full flex justify-between items-center">
                    <span>
                      <span className="font-semibold">
                        {vehicle.manufacturedYear} {vehicle.brand}
                      </span>{" "}
                      {vehicle.model}
                    </span>
                    <i className="text-xs text-gray-400">(ID: {vehicle.id})</i>
                  </p>
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>

      {activeVehicle !== 0 && (
        <div className="w-full space-y-2">
          <img
            src={
              "https://greencharge-catalog.s3.us-east-1.amazonaws.com/" +
              vehicle.image
            }
            height={180}
            width={320}
            alt="car"
            className="aspect-video object-cover"
          />
          <Divider />
          <h2
            className={`${
              vehicle.hasBeenInAccident ? "text-yellow-600" : "text-green-600"
            } flex gap-x-1 `}
          >
            {vehicle.hasBeenInAccident ? <CarCrash /> : <NoCrash />}
            {vehicle.hasBeenInAccident
              ? "Accident Recorded"
              : "No Accidents Recorded"}
          </h2>
          <h2 className="flex w-full items-end gap-x-5">

          <Stars rating={rating || 0} /> {rating}
          </h2>
          <h2 className="flex align-middle gap-x-1">
            <DirectionsCar /> {vehicle.body}
          </h2>
          <h2 className="flex gap-x-1">
            <Speed />
            <span>{vehicle.mileage} km</span>
          </h2>
        </div>
      )}
    </div>
  );
}
