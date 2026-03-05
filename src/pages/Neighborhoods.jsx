import React from "react";
import { Link } from "react-router-dom";

const Neighborhoods = () => {

  const neighborhoods = [
    {
      id: 1,
      name: "Koorkkancheri,Thrissur",
      rating: 4.5,
      description: "Modern apartments and good connectivity.",
      amenities: ["Schools",  "Temples","Hospitals"],
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    },
    {
      id: 2,
      name: "Thrissur",
      rating: 4.7,
      description: "Historic area known for culture, cafes, and tourist attractions.",
      amenities: ["Restaurants","Shopping Malls", "Art Cafes"],
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    {
      id: 3,
      name: "Amala,Thrissur",
      rating: 4.3,
      description: "Well-connected residential area near Shoba city mall",
      amenities: [ "Shopping Mall", "Hospitals"],
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Explore Neighborhoods
        </h1>
        <p className="text-gray-600">
          Discover the best places to live with ratings, amenities, and rental options.
        </p>
      </div>

      {/* Neighborhood Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {neighborhoods.map((area) => (
          <div
            key={area.id}
            className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
          >

            {/* Image */}
            <img
              src={area.image}
              alt={area.name}
              className="h-48 w-full object-cover"
            />

            {/* Content */}
            <div className="p-6">

              {/* Name */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {area.name}
              </h2>

              {/* Rating */}
              <p className="text-yellow-500 font-medium mb-2">
                ⭐ {area.rating} / 5
              </p>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">
                {area.description}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-4">
                {area.amenities.map((item, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Button */}
              <Link
                to="/rentals"
                className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                View Rentals
              </Link>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Neighborhoods;