import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProperties } from "../features/propertySlice";
import { useEffect, useState } from "react";

const Compare = () => {

  const dispatch = useDispatch()
  const properties = useSelector((state) => state.properties.properties)
  const [sort,setSort] = useState("")

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  const comparedProperties = [...properties]
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "amenities") return b.amenities.length - a.amenities.length;
      if(sort === "sqft") return b.sqft - a.sqft
      return 0
      
    })

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
      <div>
        <select
          className="border p-2 rounded"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {comparedProperties.map((property) => (
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