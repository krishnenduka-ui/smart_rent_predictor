import { Link } from "react-router-dom";

const Compare = () => {

  const properties = [
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

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">
          Compare Properties
        </h1>
        <p className="text-gray-600 mt-3">
          Compare selected rental properties side-by-side.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
          >

        
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-52 object-cover"
            />

            
            <div className="p-6">

              <h2 className="text-xl font-semibold mb-2">
                {property.title}
              </h2>

              <p className="text-blue-600 font-bold mb-4">
                {property.price}
              </p>

            
              <div className="space-y-2 text-gray-700">

                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {property.location}
                </p>

                <p>
                  <span className="font-semibold">Bedrooms:</span>{" "}
                  {property.bedrooms}
                </p>

                <p>
                  <span className="font-semibold">Bathrooms:</span>{" "}
                  {property.bathrooms}
                </p>

                <p>
                  <span className="font-semibold">Area:</span>{" "}
                  {property.area}
                </p>

              </div>

              
              <Link
                to={`/properties/${property.id}`}
                className="block mt-6 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Compare;