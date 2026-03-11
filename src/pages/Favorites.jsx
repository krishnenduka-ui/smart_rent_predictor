import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../features/propertySlice";

const Favorites = () => {

      const dispatch = useDispatch()
      const favorites = useSelector((state) => state.properties.favorites)

if (favorites.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen px-6 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          No Favorites Yet
        </h1>
      </div>)
}
  return (
    
    <div className="bg-gray-50 min-h-screen px-6 py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">
          Your Favorite Properties
        </h1>
        <p className="text-gray-600 mt-3">
          Properties you saved for later viewing.
        </p>
      </div>

      {/* Favorites Grid */}
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

              <h2 className="text-xl font-semibold">
                {property.title}
              </h2>

              <p className="text-blue-600 font-bold mt-1">
                {property.price}/month
              </p>

              <p className="text-gray-600 mt-2">
                📍 {property.location}
              </p>

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

                <button className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition" onClick={() => dispatch(removeFavorite(property))}>
                  Remove
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Favorites;