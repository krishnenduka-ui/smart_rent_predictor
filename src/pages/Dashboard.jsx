import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProperties } from "../features/propertySlice";
import { addFavorite } from "../features/favoriteSlice";
import { addSavedSearch } from "../features/savedSearchSlice";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const properties = useSelector((state) => state.properties.properties);
  const user = useSelector((state) => state.auth.loggedinUser);

  // Saved search inputs
  const [searchLocation, setSearchLocation] = useState("");
  const [searchMinPrice, setSearchMinPrice] = useState("");
  const [searchMaxPrice, setSearchMaxPrice] = useState("");
  const [searchBedrooms, setSearchBedrooms] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  const handleViewMap = (id) => navigate(`/map/${id}`);
  const handleViewDetails = (id) => navigate(`/properties/${id}`);
  const handleFavorite = (property) => {
    dispatch(addFavorite(property));
    toast.success("Added to favorites");
  };

  // Filter properties based on search inputs
  const filteredProperties = properties.filter((p) => {
    const matchesLocation = searchLocation
      ? p.location.toLowerCase().includes(searchLocation.toLowerCase())
      : true;
    const matchesMinPrice = searchMinPrice ? p.price >= Number(searchMinPrice) : true;
    const matchesMaxPrice = searchMaxPrice ? p.price <= Number(searchMaxPrice) : true;
    const matchesBedrooms = searchBedrooms ? p.bedrooms === Number(searchBedrooms) : true;
    return matchesLocation && matchesMinPrice && matchesMaxPrice && matchesBedrooms;
  });

  // Save individual property to saved searches
  const handleSaveSearch = (property) => {
    if (!user) {
      toast.error("Please log in to save searches");
      return;
    }
    const savedSearch = {
      id: Date.now(),
      userId: user.id,
      property, // save the entire property object
      date: new Date().toISOString(),
    };
    dispatch(addSavedSearch(savedSearch));
    toast.success("Property added to Saved Searches");
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <div className="flex justify-between bg-emerald-900 p-6 text-white">
        <h1 className="font-bold text-xl">My Dashboard</h1>
        <div className="flex flex-row gap-3">
          <Link to={'/dashboard'} className="flex items-center gap-2 p-2">
            <FaUser /> {user.username}
          </Link>
          <Link to={"/favorites"} className="p-2 hover:text-gray-300">Favorites</Link>
          <Link to={"/saved-searches"} className="p-2 hover:text-gray-300">Saved Searches</Link>
          <button
            className="flex items-center gap-2 p-2 border rounded hover:text-gray-300"
            onClick={handleLogout}
          >
            <FiLogOut className="text-lg" /> Logout
          </button>
        </div>
      </div>

      {/* Search Inputs (filtering only) */}
      <div className="p-4 bg-white m-3 rounded shadow">
        <div className="flex gap-3 mb-4 flex-wrap">
          <input
            type="text"
            placeholder="Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={searchMinPrice}
            onChange={(e) => setSearchMinPrice(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={searchMaxPrice}
            onChange={(e) => setSearchMaxPrice(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Bedrooms"
            value={searchBedrooms}
            onChange={(e) => setSearchBedrooms(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-3">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white p-3 rounded shadow">
            <img
              className="w-full h-60 object-cover rounded"
              src={property.image}
            />
            <h2>{property.title}</h2>
            <p>{property.price}/month</p>
            <p>{property.location}</p>

            <div className="flex justify-between mt-2 gap-2">
              <button
                className="bg-green-600 rounded p-3"
                onClick={() => handleViewDetails(property.id)}
              >
                View Details
              </button>
              <button
                className="bg-green-600 rounded p-3"
                onClick={() => handleViewMap(property.id)}
              >
                View on Map
              </button>
              </div>
              <div className="flex justify-between mt-2 gap-2">
              <button
                className="bg-green-600 rounded p-3"
                onClick={() => handleFavorite(property)}
              >
                Add to favorite
              </button>
              <button
                className="bg-green-600 rounded p-3"
                onClick={() => handleSaveSearch(property)}
              >
                Save Property
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;