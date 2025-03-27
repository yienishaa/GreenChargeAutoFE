import { Speed } from "@mui/icons-material";
export default function VehicleCard({ car }) {
  return (
    <div className="shadow-lg p-4 flex-col">
      <h1 className="space-x-1">
        <span>{car.manufacturedYear}</span>
        <span className="font-bold">{car.brand}</span>
        <span>{car.model}</span>
      </h1>
      <h2>

      <Speed className="mr-1"/>
      <span>{car.mileage}km</span>
</h2>
<h2>${car.price}</h2>
    </div>
  );
}
