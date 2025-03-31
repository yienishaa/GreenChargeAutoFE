import { AddCircle, RemoveCircle } from "@mui/icons-material";
import CompareCard from "../components/CompareCard";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../globals";

export default function Compare() {
  const [vehicles, setVehicles] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const addCompare = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };

  const removeCompare = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${API.BASE_URL}/vehicles`);
        const formatted = response.data.map(({ vid, ...rest }) => ({
          id: vid,
          ...rest,
        }));
        setVehicles(formatted);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div>Loading vehicles...</div>;
  }

  if (error) {
    return (
      <div className="pt-28 flex justify-center gap-x-10 h-screen items-center align-middle">
        An error occurred. {error}.
      </div>
    );
  }

  return (
    <div className="pt-28 flex justify-center gap-x-10 h-screen align-middle">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <CompareCard
            vehicles={vehicles}
            remove={() => removeCompare(index)}
          />
        </div>
      ))}
      <div className="flex flex-col space-y-5">
        <button onClick={addCompare}>
          <AddCircle fontSize="large" />
        </button>
        <button onClick={removeCompare}>
          <RemoveCircle fontSize="large" />
        </button>
      </div>
    </div>
  );
}
