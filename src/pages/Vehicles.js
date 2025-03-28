import React, { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import axios from "axios";


const Vehicles = () => {
  // Temporary vehicle testing list
  // const vehicles = [
  //   {
  //     vid: 1,
  //     brand: "Toyota",
  //     description: "Help me I'm dying",
  //     hasBeenInAccident: false,
  //     manufacturedYear: 2004,
  //     mileage: 192042.69,
  //     model: "Prius",
  //     price: 234567,
  //     body: "hatchback",
  //     quantity: 5,
  //     image: "https://picsum.photos/1920/1080"
  //   },
  //   {
  //     vid: 2,
  //     brand: "Honda",
  //     description: "This state of the art fully kitted loaded car is fabulous for road trips and is guaranteed not to blow up on you because that's totally legit.",
  //     hasBeenInAccident: true,
  //     manufacturedYear: 2004,
  //     mileage: 192042.69,
  //     model: "Odyssey",
  //     price: 234567.9,
  //     fuel: "diesel",
  //     body: "minivan",
  //     quantity: 0
  //   },
  // ];
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/vehicles");
        setVehicles(response.data);

      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="h-screen justify-center items-center">Error: {error}</div>;
  }

  return (

    <div className="pt-28 justify-center flex w-full pb-10">
      <ul className="grid grid-cols-3 px-5 gap-5 w-5/6">
        {vehicles.map((vehicle) => (
          <li key={vehicle.vid}>
            <VehicleCard car={vehicle} />
          </li>
        ))}
      </ul>
    </div>

  );
};

export default Vehicles;
