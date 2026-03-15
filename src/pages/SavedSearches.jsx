import { useSelector, useDispatch } from "react-redux";
import { removeSavedSearch } from '../features/savedSearchSlice';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { logout } from "../features/authSlice";

const SavedSearches = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.loggedinUser);

   const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


  // Only get saved searches for this user
  const savedSearches = useSelector((state) =>
    state.savedSearches.searches.filter((s) => s.userId === user.id)
  );

  const handleViewDetails = (id) => {
    navigate(`/properties/${id}`);
  };

  const handleRemove = (id) => {
    dispatch(removeSavedSearch(id));
    toast.success("Removed from saved searches");
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
      <h2 className="text-3xl font-bold mb-6 mt-6 text-center">My Saved Properties</h2>

      {savedSearches.length === 0 ? (
        <p>No saved properties yet.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {savedSearches.map((s) => {
            const property = s.property; // saved property object
            return (
              <div key={s.id} className="bg-white rounded shadow overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                  <p className="text-emerald-600 font-bold mb-2">{property.price}/month</p>
                  <p className="text-gray-700 mb-2">{property.location}</p>
                  <p className="text-gray-700 mb-2">
                    {property.bedrooms} Bed, {property.bathrooms} Bath, {property.sqft} sq.ft
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
                      onClick={() => handleViewDetails(property.id)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                      onClick={() => handleRemove(s.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedSearches;