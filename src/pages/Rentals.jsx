import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProperties} from "../features/propertySlice";
import { useNavigate } from "react-router-dom";

const Rentals = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const properties = useSelector((state) => state.properties.properties);

  const searchProperty = useSelector((state) => state.properties.search);

  const [searchLocation, setSearchLocation] = useState("")
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  const [selectedBedrooms, setSelectedBedrooms] = useState("")


  const [searchProperies, setSearchProperties] = useState([])


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

      if (selectedBedrooms === 0) {

        return property.bedrooms === 0

      }
      else if (selectedBedrooms === 1) {
        return property.bedrooms === 1
      }
      else if (selectedBedrooms === 2) {
        return property.bedrooms === 2
      }
      else if (selectedBedrooms === 3) {
        return property.bedrooms >= 3
      }
      else
        return true

    })



  const handleSearch = ((e) => {

    console.log(e.target.value)
  })

 const handleClick = ()=>{
  navigate("/map")
 }




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
          <form className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Location"
              className="p-3 border rounded"
              name={searchLocation}
              onInput={(e) => setSearchLocation(e.target.value)}


            />

            <select className="p-3 border rounded"
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option value={" "}>Price Range</option>
              <option value={5000 - 10000}>5000 - 10000</option>
              <option value={10000 - 15000}>10000 - 15000</option>
              <option value={15000}>15000+</option>
            </select>

            <select className="p-3 border rounded"
              value={selectedBedrooms}
              onChange={(e) => setSelectedBedrooms(e.target.value)}
            >
              <option value={" "} >Bedrooms</option>
              <option value={0}>Studio</option>
              <option value={1}>1 Bedroom</option>
              <option value={2}>2 Bedroom</option>
              <option value={3}>3+ Bedrooms</option>
            </select>

            <button className="bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={handleSearch}>
              Search
            </button>
          </form>
        </div>
      </div>



      <div className=" flex flex-row gap-3 p-4">


        {/*------------------- Filters----------------- */}

        <div className="sm:w-200  p-6 rounded shadow">
          <h2 className="font-semibold text-lg mb-4">Filters</h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Property Type</label>
            <select className="w-full p-2 border rounded">
              <option>Select type</option>
              <option>Apartment</option>
              <option>Studio</option>
              <option>House</option>
            </select>
          </div>


          <div className="mb-4">
            <label className="block mb-2 font-medium">Bedrooms</label>
            <select className="w-full p-2 border rounded">
              <option>Bedrooms</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>
          </div>


          <div>
            <label className="block mb-2 font-medium">Amenities</label>
            <div className="flex flex-col">
              <label>
                <input type="checkbox" /> Pet-friendly
              </label>
              <label>
                <input type="checkbox" /> Parking
              </label>
              <label>
                <input type="checkbox" /> Pool
              </label>
            </div>
          </div>
        </div>



        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {
            searchProperties.map((property) => {
              return (
                <div key={property.id}>
                  <img src={property.image} />
                  <h2>{property.title}</h2>
                  <p>{property.price}</p>
                  <p>{property.location}</p>
                  <p>{property.bedrooms}</p>
                  <button className="bg-blue-400 rounded p-3" onClick={handleClick}>View on Map</button>
                </div>)
            })}
            

        </div>

      </div>
    </div>
  );
};

export default Rentals;