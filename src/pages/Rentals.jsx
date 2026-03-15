import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProperties, searchProperty } from "../features/propertySlice";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
const Rentals = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const properties = useSelector((state) => state.properties.properties);

  const searchProperty = useSelector((state) => state.properties.search);

  const [searchLocation, setSearchLocation] = useState("")
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  const [selectedBedrooms, setSelectedBedrooms] = useState("")
  const [selectType, setSelectType] = useState("")
  const [selectBathrooms, setSelectBathrooms] = useState("")
  const [selectAmenities, setSelectAmenities] = useState([])
  


  useEffect(() => {
    dispatch(fetchProperties());
  }, []);


  const searchProperties = properties
    .filter((property) =>
      property.location.toLowerCase().includes(searchLocation.toLowerCase())
    )


    .filter((property) => {
      if (selectedPriceRange === "5000-10000") {

        return property.price >= 5000 && property.price <= 10000
      }
      else if (selectedPriceRange === "10000-15000") {
        return property.price >= 10000 && property.price <= 15000

      }
      else if (selectedPriceRange === "15000") {
        return property.price >= 15000
      }
      else
        return true

    })



    .filter((property) => {

      if (selectedBedrooms === "0") {

        return property.bedrooms == 0

      }
      else if (selectedBedrooms === "1") {
        return property.bedrooms == 1
      }
      else if (selectedBedrooms === "2") {
        return property.bedrooms == 2
      }
      else if (selectedBedrooms === "3") {
        return property.bedrooms >= 3
      }
      else
        return true

    })

    .filter((property) =>
      property.title.toLowerCase().includes(selectType.toLowerCase())
    )

    .filter((property) => {

      if (selectBathrooms === "0") {

        return property.bathrooms == 0

      }
      else if (selectBathrooms === "1") {
        return property.bathrooms == 1
      }
      else if (selectBathrooms === "2") {
        return property.bathrooms == 2
      }
      else if (selectBathrooms === "3") {
        return property.bathrooms >= 3
      }
      else
        return true

    })

    .filter((property) =>
      selectAmenities.length === 0
        ? true
        : selectAmenities.every((amenity) =>
          property.amenities.includes(amenity)
        )
    )

  const handleAmenities = (e) => {
    const { value, checked } = e.target;

    setSelectAmenities((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((amenity) => amenity !== value)
    );
  };


  return (
    <div className="bg-gray-100 min-h-screen">


      <div className="text-center py-14 px-6">

        <h1 className="sm:text-2xl md:text-3xl lg:text-4xl">
          Browse Available Rentals
        </h1>
        <p className="mt-5 sm:text-sm md:text-base lg:text-lg">
          Find Apartments, studios and houses in your preferred location
        </p>


        {/* Search Apartments */}
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
          <form className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Location"
              className="p-3 border rounded"
              value={searchLocation}
              onInput={(e) => setSearchLocation(e.target.value)}


            />

            <select className="p-3 border rounded"
              value={selectedPriceRange}
              onInput={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option value=" ">Price Range</option>
              <option value="5000-10000">5000 - 10000</option>
              <option value="10000-15000">10000 - 15000</option>
              <option value="15000">15000+</option>
            </select>

            <select className="p-3 border rounded"
              value={selectedBedrooms}
              onInput={(e) => setSelectedBedrooms(e.target.value)}
            >
              <option value=" " >Bedrooms</option>
              <option value="0">Studio</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedroom</option>
              <option value="3">3+ Bedrooms</option>
            </select>

            
          </form>
        </div>
      </div>



      {/* ----------Filter-------------------- */}

      <div className="flex flex-row gap-3 p-4">
        <div className=" flex-1 p-6 rounded shadow">
          <h2 className="font-semibold text-lg mb-4">Filters</h2>
          <div className="mb-4">
             <label className="block mb-2 font-medium">Property Type</label>
             <select className="p-2 border rounded w-full"
              value={selectType}
              onInput={(e) => setSelectType(e.target.value)}>
              <option value=" ">Select type</option>
              <option value="apartment">Apartment</option>
              <option value="studio">Studio</option>
              <option value="house">House</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Bathrooms</label>
            <select className=" p-2 border rounded w-full"
              value={selectBathrooms}
              onInput={(e) => setSelectBathrooms(e.target.value)}>
              <option value=" ">Bathrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>

          <div >
            <label className="block mb-2 font-medium">Amenities</label>
            <div className="flex flex-col">
              <label>
                <input type="checkbox" value="pet-friendly" onChange={handleAmenities} /> Pet-friendly
              </label>
              <label>
                <input type="checkbox" value="parking" onChange={handleAmenities} /> Parking
              </label>
              <label>
                <input type="checkbox" value="pool" onChange={handleAmenities} /> Pool
              </label>
              <label>
                <input type="checkbox" value="security" onChange={handleAmenities} /> Security
              </label>
              <label>
                <input type="checkbox" value="gym" onChange={handleAmenities} /> gym
              </label>

            </div>
          </div>  
        </div>

       
          <div className=" flex-3 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {
            searchProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}


        </div>
      
      </div>


      
    </div>
  );
};

export default Rentals;