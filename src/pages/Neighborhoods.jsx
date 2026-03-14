import React from "react";
import { Link } from "react-router-dom";
import { fetchProperties } from "../features/propertySlice";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
const Neighborhoods = () => {
  
  const dispatch = useDispatch()
  const neighborhoods =  useSelector((state)=>state.properties.properties)

  useEffect(() => {
      dispatch(fetchProperties());
    }, []);


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

        {neighborhoods.map((neighbor) => (
          <div
            key={neighbor.id}
            className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
          >

            {/* Image */}
            <img
              src={neighbor.image}
              className="h-48 w-full object-cover"
            />

            {/* Content */}
            <div className="p-6">

              {/* Name */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {neighbor.name}
              </h2>

              {/* Rating */}
              <p className="text-yellow-500 font-medium mb-2">
                ⭐ {neighbor.rating} / 5
              </p>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">
                {neighbor.description}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-4">
                {neighbor.amenities.map((item, index) => (
                  <span
                    key={index}
                    className="text-xs bg-emerald-500 text-white px-2 py-1 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Neighborhoods */}
              <div className="flex flex-wrap gap-2 mb-4">
                {neighbor.neighbourhoods.map((item, index) => (
                  <span
                    key={index}
                    className="text-xs bg-emerald-500 text-white px-2 py-1 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Button */}
              <Link 
               key={neighbor.id}
               to={`/properties/${neighbor.id}`} 
                className="block text-center bg-emerald-600 text-white py-2 rounded hover:bg-emerald-300 transition"
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

export default Neighborhoods;