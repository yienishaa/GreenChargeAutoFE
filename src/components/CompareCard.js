import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { useState } from "react";

export default function CompareCard({ vehicles }) {
  const [activeVehicle, setActiveVehicle] = useState(0);
  const [vehicle, setVehicle] = useState(0);


  const updateVehicle = (id) => {
    setActiveVehicle(id);
    fetch(`http://localhost:8080/vehicles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVehicle(data);
      })
      .catch((err) => {
        console.log(err.message)
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
          <h2>
            Mileage: {vehicle.mileage}km
          </h2>
        </div>
      )}
    </div>
  );
}
