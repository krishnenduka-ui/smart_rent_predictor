import React from "react";
import { Link } from "react-router-dom";
import { fetchProperties } from "../features/propertySlice";
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
const Neighborhoods = () => {
  
  const dispatch = useDispatch()
  const properties =  useSelector((state)=>state.properties.properties)
   const [sort,setSort] = useState("")

  useEffect(() => {
      dispatch(fetchProperties());
    }, []);

    const sortedProperties =[...properties]
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "amenities") return b.amenities.length - a.amenities.length;
      if(sort === "sqft") return b.sqft - a.sqft
    
      return 0
    })


  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="flex justify-around">
      <div className=" mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Explore Neighborhoods
        </h1>
        <p className="text-gray-600">
          Discover the best places to live with ratings, amenities, and rental options.
        </p>
      </div>
      <div>
        <select
          className="border align-center p-2 w-100 mb-8 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="amenities">Amenities</option>
          <option value="sqft">Area</option>
        </select>

      </div>
      
    </div>
      {/* Neighborhood Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {sortedProperties.map((neighbor) => (
          <div
            key={neighbor.id}
            className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={neighbor.image}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {neighbor.title}
              </h2>
              <p className="text-yellow-500 font-medium mb-2">
                ⭐ {neighbor.rating} / 5
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {neighbor.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {neighbor.amenities.map((item, index) => (
                  <div key={index} className="text-xs bg-emerald-500 text-white px-2 py-1 rounded">
                    {item}
                  </div>
                ))}
              </div>

            
              <div className="flex flex-wrap gap-2 mb-4">
                {neighbor.neighbourhoods.map((item, index) => (
                  <div key={index} className="text-xs bg-emerald-500 text-white px-2 py-1 rounded" >
                    {item}
                  </div>
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