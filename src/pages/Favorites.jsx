import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { logout } from "../features/authSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.favorites);
  const user = useSelector((state) => state.auth.loggedinUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between bg-emerald-900 p-6 text-white">
        <h1 className="font-bold text-xl">My Dashboard</h1>
        <div className="flex flex-row gap-3">
          <Link to={'/dashboard'} className="flex items-center gap-2 p-2">
            <FaUser /> {user.username}
          </Link>
          <Link to={"/favorites"} className="p-2 hover:text-gray-300">
            Favorites
          </Link>
          <Link to={"/saved-searches"} className="p-2 hover:text-gray-300">
            Saved Searches
          </Link>
          
          <button
            className="flex items-center gap-2 p-2 border rounded hover:text-gray-300"
            onClick={handleLogout}
          >
            <FiLogOut className="text-lg" /> Logout
          </button>
        </div>
      </div>

      {/* No Favorites Message */}
      {favorites.length === 0 && (
        <div className="bg-gray-50 min-h-[calc(100vh-96px)] flex flex-col justify-center items-center px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            No Favorites Yet
          </h2>
          <p className="text-gray-600">
            Save properties to see them here for later viewing.
          </p>
        </div>
      )}


        <div className="px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mt-6">
              Your Favorite Properties
            </h2>
            <p className="text-gray-600 mt-3">
              Properties you saved for later viewing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
              >
                {/* Property Image */}
                <img
                  src={property.image}
                  className="w-full h-52 object-cover"
                />

                {/* Property Info */}
                <div className="p-5">
                  <h2 className="text-xl font-semibold">{property.title}</h2>
                  <p className="text-blue-600 font-bold mt-1">
                    {property.price}/month
                  </p>
                  <p className="text-gray-600 mt-2">📍 {property.location}</p>

                  {/* Features */}
                  <div className="flex justify-between text-sm text-gray-700 mt-3">
                    <span>🛏 {property.bedrooms} Beds</span>
                    <span>🛁 {property.bathrooms} Baths</span>
                    <span>📐 {property.area}</span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-5">
                    <Link
                      to={`/properties/${property.id}`}
                      className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                      View Details
                    </Link>

                    <button
                      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                      onClick={() => dispatch(removeFavorite(property))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      
    </div>
  );
};

export default Favorites;