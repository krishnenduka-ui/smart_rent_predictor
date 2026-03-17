import { useSelector, useDispatch } from "react-redux";
import { removeSavedSearch } from "../features/savedSearchSlice";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../features/authSlice";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { toast } from "react-hot-toast";

const SavedSearches = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.loggedinUser);
 const savedSearches = useSelector((state) =>
  state.savedSearches.searches.filter((s) => s.userId === user?.id)
);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between bg-emerald-900 p-6 text-white">
        <h1 className="font-bold text-xl">My Dashboard</h1>
        <div className="flex gap-3">
          {user ? (
            <Link to="/dashboard" className="flex items-center gap-2">
              <FaUser /> {user.username}
            </Link>
          ) : (
            <p>Loading...</p>
          )}
          <Link to="/favorites" className="hover:text-gray-300">Favorites</Link>
          <Link to="/saved-searches" className="hover:text-gray-300">Saved Searches</Link>
          <button className="flex items-center gap-2 border rounded hover:text-gray-300 p-2" onClick={handleLogout}><FiLogOut /> Logout</button>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mt-6 mb-6">Saved Properties</h2>

      {savedSearches.length === 0 ? (
        <p className="text-center">No saved properties yet.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {savedSearches.map((s) => (
            <div key={s.id} className="bg-white rounded shadow overflow-hidden">
              <img src={s.property.image} alt={s.property.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{s.property.title}</h2>
                <p className="text-emerald-600 font-bold">{s.property.price}/month</p>
                <p>📍 {s.property.location}</p>
                <p>🛏 {s.property.bedrooms} Beds | 🛀 {s.property.bathrooms} Baths | 📏 {s.property.sqft} sqft</p>

                <div className="flex gap-2 mt-4">
                  <button onClick={() => navigate(`/properties/${s.property.id}`)} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-500">View Details</button>
                  <button onClick={() => { dispatch(removeSavedSearch(s.id)); toast.success("Removed!"); }} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-400">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedSearches;