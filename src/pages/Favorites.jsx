import { useSelector, useDispatch } from "react-redux";
import { initializeFavorites, removeFavorite } from "../features/favoriteSlice";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.loggedinUser);
  const favorites = useSelector((state) => state.favorites.favorites);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Load user's favorites
  useEffect(() => {
    if (user?.id) dispatch(initializeFavorites(user.id));
  }, [user, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
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

      {favorites.length === 0 ? (
        <p className="text-center mt-20">No favorites yet.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {favorites.map((property) => (
            <div key={property.id} className="bg-white rounded shadow overflow-hidden">
              <img src={property.image} alt={property.title} className="w-full h-52 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <p className="text-blue-600 font-bold">{property.price}/month</p>
                <p>📍 {property.location}</p>

                <div className="flex gap-2 mt-4">
                  <Link to={`/properties/${property.id}`} className="flex-1 bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700">View Details</Link>
                  <button onClick={() => dispatch(removeFavorite({ userId: user.id, propertyId: property.id }))} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;