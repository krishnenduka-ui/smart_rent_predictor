import { Link } from "react-router-dom";

const Favorites = () => {

  const favorites = [
     {
      id: 1,
      title: "Modern 2 Bedroom Apartment",
      price: 15000,
      location: "Punkunnam,Thrissur",
      bedrooms: 2,
      bathrooms: 1,
      area: "950 sq.ft",
      image: "https://xhomesg.com.vn/wp-content/uploads/2024/12/thiet-ke-noi-that-chung-cu-2-phong-ngu-28.jpg",
    },
    {
      id: 2,
      title: "Luxury Studio Downtown",
      price: "8000/month",
      location: "Ayyanthole,Thrissur",
      bedrooms: 1,
      bathrooms: 1,
      area: "600 sq.ft",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/623977897.jpg?k=66fb4d4747d34e6e452f22af88cab233c9bdffc40d3a09e81d1ee22a3f9d9b8d&o=",
    },
    {
      id: 3,
      title: "Cozy Family Home",
      price: 30000,
      location: "Amala,Thrissur",
      bedrooms: 3,
      bathrooms: 2,
      area: "1200 sq.ft",
      image: "https://cdn2.atlantamagazine.com/wp-content/uploads/sites/12/2016/07/0716_mintz01_jherr_oneuseonly.jpg",
    }
  ];

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
              alt={property.title}
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

                <button className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
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