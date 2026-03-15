import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCompare } from '../features/compareSlice'

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewMap = () => {
    navigate(`/map/${property.id}`);
  };

  const handleViewDetails = () => {
    navigate(`/properties/${property.id}`);
  };

  const handleAddToCompare = () => {
    dispatch(addToCompare(property));
  };

  return (
    <div className="border rounded shadow p-3 bg-white hover:shadow-lg transition">
      <img
        className="w-full h-48 object-cover rounded mb-2"
        src={property.image}
        alt={property.title}
      />

      <h2 className="font-semibold text-lg">{property.title}</h2>
      <p className="text-gray-700">Rent: {property.price}/month</p>
      <p className="text-gray-700">Location: {property.location}</p>
      <p className="text-gray-700">Bedrooms: {property.bedrooms}</p>

      <div className="flex justify-between flex-wrap gap-2">
        <button
          className="bg-green-600 text-white rounded p-2 mt-2 hover:bg-green-500"
          onClick={handleViewMap}
        >
          View on Map
        </button>

        <button
          className="bg-green-600 text-white rounded p-2 mt-2 hover:bg-green-500"
          onClick={handleViewDetails}
        >
          View Details
        </button>

        <button
          className="bg-blue-600 text-white rounded p-2 mt-2 hover:bg-blue-500"
          onClick={handleAddToCompare}
        >
          Compare
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;