import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { fetchProperties } from "../features/propertySlice";
import { addFavorite, initializeFavorites } from "../features/favoriteSlice";
import { addSavedSearch } from "../features/savedSearchSlice";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get data from Redux store
  const properties = useSelector((state) => state.properties.properties);
  const user = useSelector((state) => state.auth.loggedinUser);
  const savedSearches = useSelector((state) => state.savedSearches.searches);

  // Local state for search inputs
  const [searchLocation, setSearchLocation] = useState("");
  const [searchMinPrice, setSearchMinPrice] = useState("");
  const [searchMaxPrice, setSearchMaxPrice] = useState("");
  const [searchBedrooms, setSearchBedrooms] = useState("");

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Load all properties when component mounts
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // Load current user's favorites when user logs in
  useEffect(() => {
    if (user?.id) {
      dispatch(initializeFavorites(user.id));
    }
  }, [user, dispatch]);

  // Navigation helpers
  const handleViewMap = (id) => navigate(`/map/${id}`);
  const handleViewDetails = (id) => navigate(`/properties/${id}`);

  // Add property to favorites
  const handleFavorite = (property) => {
    dispatch(addFavorite({ userId: user.id, property }));
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

  // Save property to Saved Searches
  const handleSaveSearch = (property) => {
    const alreadySaved = savedSearches.find(
      (s) => s.userId === user.id && s.property.id === property.id
    );
    if (alreadySaved) {
      toast.error("Property is already saved");
      return;
    }
    dispatch(addSavedSearch({ id: Date.now(), userId: user.id, property }));
    toast.success("Property saved");
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <div className="flex justify-between bg-emerald-900 p-6 text-white">
        <h1 className="font-bold text-xl">My Dashboard</h1>
        <div className="flex flex-row gap-2">
          <p className="flex items-center gap-2 p-2"><FaUser /> {user.username}</p>
          <Link to="/favorites" className="p-2 hover:text-gray-300">Favorites</Link>
          <Link to="/saved-searches" className="p-2 hover:text-gray-300">Saved Searches</Link>
          <button
            className="flex items-center gap-2 border rounded hover:text-gray-300 p-2"
            onClick={handleLogout}
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Search Inputs */}
      <div className="p-4 bg-white m-3 rounded shadow flex gap-3 flex-wrap">
        <input type="text" placeholder="Location" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="border p-2 rounded" />
        <input type="number" placeholder="Min Price" value={searchMinPrice} onChange={(e) => setSearchMinPrice(e.target.value)} className="border p-2 rounded" />
        <input type="number" placeholder="Max Price" value={searchMaxPrice} onChange={(e) => setSearchMaxPrice(e.target.value)} className="border p-2 rounded" />
        <input type="number" placeholder="Bedrooms" value={searchBedrooms} onChange={(e) => setSearchBedrooms(e.target.value)} className="border p-2 rounded" />
      </div>

      {/* Properties */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-3">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white p-3 rounded shadow">
            <img src={property.image} className="w-full h-60 object-cover rounded" />
            <h2>{property.title}</h2>
            <p>{property.price}/month</p>
            <p>{property.location}</p>

            <div className="flex gap-2 mt-2">
              <button className="bg-green-600 rounded p-3 flex-1" onClick={() => handleViewDetails(property.id)}>View Details</button>
              <button className="bg-green-600 rounded p-3 flex-1" onClick={() => handleViewMap(property.id)}>View on Map</button>
            </div>

            <div className="flex gap-2 mt-2">
              <button className="bg-green-600 rounded p-3 flex-1" onClick={() => handleFavorite(property)}>Add to Favorite</button>
              <button className="bg-green-600 rounded p-3 flex-1" onClick={() => handleSaveSearch(property)}>Save Property</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;