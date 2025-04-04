import React, { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Slider,
  Button, Stack, Switch, FormControlLabel, FormControl, InputLabel, Select, OutlinedInput, Chip, IconButton, Checkbox
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import API from "../globals";
import CompareModal from "../components/CompareModal";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('');
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [compareList, setCompareList] = useState([]);

  const [state, setState] = React.useState({
    history: false,
  });

  const [filters, setFilters] = useState({
    brand: [],
    body: '',
    year: '',
    hasBeenInAccident: false,
    maxPrice: 100000
  });

  // Unique brand/body values for dropdowns
  const brands = [...new Set(vehicles.map(v => v.brand))];
  const bodies = [...new Set(vehicles.map(v => v.body))];
  const years = [...new Set(vehicles.map(v => v.manufacturedYear))];


  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCompareNow = () => {
    setCompareModalOpen(true);
  };

  const handleCloseCompare = () => {
    handleClearAll();
    setCompareModalOpen(false);
  };

  const handleClearAll = () => {
    setCompareList([]);
  };

  const toggleCompare = (vehicle) => {
      if (compareList.some(v => v.id === vehicle.id)) {
        setCompareList(compareList.filter(v => v.id !== vehicle.id));
      } else if (compareList.length <= 4) {
        setCompareList([...compareList, vehicle]);
      }

  };


  const resetFilters = () => {
    setFilters({
      brand: [],
      body: '',
      year: '',
      hasBeenInAccident: false,
      maxPrice: 100000
    });
  };

  // Apply filters
  const filteredVehicles = vehicles.filter(v => {
    const matchBrand = filters.brand.length > 0 ? filters.brand.includes(v.brand) : true;
    const matchBody = filters.body ? v.body === filters.body : true;
    const matchYear = filters.year ? v.manufacturedYear === parseInt(filters.year) : true;
    const matchHistory = filters.hasBeenInAccident
        ? v.hasBeenInAccident === true
        : true;
    const matchPrice = v.price <= filters.maxPrice;

    return matchBrand && matchBody && matchYear && matchHistory && matchPrice;

  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortOption === 'priceLowHigh') return a.price - b.price;
    if (sortOption === 'priceHighLow') return b.price - a.price;
    return 0;
  });



  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${API.BASE_URL}/vehicles`);

        const formatted = response.data.map(({ vid, ...rest }) => ({
          id: vid,
          ...rest,
        }));
        setVehicles(formatted);
        console.log(formatted);
        //setVehicles(response.data);

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
        <Box className="pt-28 px-5 w-full flex flex-col gap-4 items-center" >
          <Box className=" pt-10 pb-10 pl-10 pr-10 justify-center rounded-lg shadow-sm bg-lime-100">
            <Stack direction="row" spacing={2}>
              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id="brand-label" sx={{color:'black'}}>Brand</InputLabel>
                <Select
                    color={"primary"}
                    labelId="brand-label"
                    multiple
                    value={filters.brand}
                    onChange={(e) => handleFilterChange("brand", e.target.value)}
                    input={<OutlinedInput label="Brand" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                              <Chip key={value} label={value} />
                          ))}
                        </Box>
                    )}
                >
                  {brands.map((b) => (
                      <MenuItem key={b} value={b}>
                        {b}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                  select
                  label="Body Type"
                  value={filters.body}
                  onChange={(e) => handleFilterChange("body", e.target.value)}
                  size="small"
                  sx={{ width: 'auto', minWidth: 120  }}
                  InputLabelProps={{
                    sx: {
                      color: 'black',
                    },
                  }}
              >
                <MenuItem value="">All</MenuItem>
                {bodies.map((b) => (
                    <MenuItem key={b} value={b}>{b}</MenuItem>
                ))}
              </TextField>

              <TextField
                  select
                  label="Model Year"
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                  size="small"
                  sx={{ width: 'auto', minWidth: 130 }}
                  InputLabelProps={{
                    sx: {
                      color: 'black',
                    },
                  }}
              >
                <MenuItem value="">All</MenuItem>
                {years.map((b) => (
                    <MenuItem key={b} value={b}>{b}</MenuItem>
                ))}
              </TextField>

              <FormControlLabel
                  control={
                    <Switch
                        checked={filters.hasBeenInAccident}
                        onChange={(e) => handleFilterChange("hasBeenInAccident", e.target.checked)}
                        name="hasBeenInAccident"
                    />
                  }
                  label="Show Vehicles with Accident History"
              />

              <Box sx={{ width: 200, px: 1 }}>
                <Typography gutterBottom>Max Price: ${filters.maxPrice.toLocaleString()}</Typography>
                <Slider
                    value={filters.maxPrice}
                    onChange={(e, newValue) => handleFilterChange('maxPrice', newValue)}
                    step={1000}
                    min={1000}
                    max={100000}
                    valueLabelDisplay="auto"
                />
              </Box>

              <Box display="flex" flexDirection="column" alignItems="center" width={100}>
                <IconButton
                    onClick={() =>
                        setSortOption((prev) =>
                            prev === 'priceHighLow' ? 'priceLowHigh' : 'priceHighLow'
                        )
                    }
                    sx={{
                      backgroundColor: sortOption ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
                      borderRadius: 2,
                      transition: 'background-color 0.2s',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.2)',
                      },
                    }}
                >
                  {sortOption === 'priceHighLow' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                </IconButton>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontStyle: 'italic',
                      mt: 0.5,
                      width: 100,
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                >
                  {sortOption === 'priceLowHigh'
                      ? 'Low → High'
                      : sortOption === 'priceHighLow'
                          ? 'High → Low'
                          : 'Default'}
                </Typography>
              </Box>



              <Button onClick={resetFilters} variant="outlined">Reset Filters</Button>
            </Stack>

          </Box>
          <div className=" justify-center flex w-full pb-10">
            <ul className="grid grid-cols-3 px-5 gap-5 w-5/6">
              {sortedVehicles.map((vehicle) => (
                  <li key={vehicle.id}>
                    <VehicleCard
                        vehicle={vehicle}
                        onToggleCompare={toggleCompare}
                        isSelected={compareList.some(v => v.id === vehicle.id)}
                        compareDisabled={compareList.length >= 4}
                        checkVehicleCount
                    />

                  </li>
              ))}
              <CompareModal
                  open={compareModalOpen}
                  onClose={handleCloseCompare}
                  vehicles={compareList}
              />
            </ul>
            {compareList.length > 0 && (
                <Box className="fixed bottom-0 left-0 right-0 bg-white shadow-lg px-6 py-4 z-50 flex items-center justify-between border-t">
                  <div className="flex gap-4 overflow-x-auto">
                    {compareList.map(vehicle => (
                        <Box key={vehicle.id} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                          <img
                              src={vehicle.image ? `${API.S3_BUCKET}/${vehicle.image}` : ""}
                              alt={vehicle.model}
                              className="h-10 w-10 object-cover rounded"
                          />
                          <span className="text-sm font-medium whitespace-nowrap">
                            {vehicle.brand} {vehicle.model}
                          </span>
                          <button
                              onClick={() => toggleCompare(vehicle)}
                              className="text-red-600 text-xl font-bold"
                          >
                            ×
                          </button>
                        </Box>
                    ))}
                  </div>
                  <Button
                      variant="contained"
                      onClick={handleCompareNow}
                      disabled={compareList.length < 2}
                  >
                    Compare Now
                  </Button>
                  <Button
                      variant="contained"
                      onClick={handleClearAll}
                      disabled={compareList.length < 2}
                  >
                    Clear All
                  </Button>
                </Box>
            )}
          </div>
        </Box>

  );
};

export default Vehicles;
