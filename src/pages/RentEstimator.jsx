// RentEstimator.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../features/propertySlice";
import { trainRentEstimator, estimateRent } from '../features/rentEstimatorSlice';

const AMENITIES_KEYWORDS = ["wifi", "parking", "pool", "gym", "pet-friendly", "security"];
const NEIGHBOURHOODS_KEYWORDS = ["school", "hospital", "shopping_mall", "temple", "hypermarket"];

const RentEstimator = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.properties);
  const predictedRent = useSelector((state) => state.rentEstimator.predictedRent);

  const [sqft, setSqft] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [amenities, setAmenities] = useState("");
  const [neighbourhoods, setNeighbourhoods] = useState("");
  const [rating, setRating] = useState("");

  const [recognizedAmenities, setRecognizedAmenities] = useState([]);
  const [invalidAmenities, setInvalidAmenities] = useState([]);
  const [recognizedNeighbourhoods, setRecognizedNeighbourhoods] = useState([]);
  const [invalidNeighbourhoods, setInvalidNeighbourhoods] = useState([]);

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  useEffect(() => {
    if (properties.length > 0) {
      dispatch(trainRentEstimator(properties));
    }
  }, [properties]);

  // Function to parse keywords from text
  const parseKeywords = (text, keywords) => {
    const items = text
      .toLowerCase()
      .split(/,|and/)
      .map(item => item.trim())
      .filter(item => item !== "");

    const recognized = items.filter(item => keywords.includes(item));
    const invalid = items.filter(item => !keywords.includes(item));

    return { recognized, invalid };
  };

  // Handlers for text inputs
  const handleAmenitiesChange = (e) => {
    const value = e.target.value;
    setAmenities(value);

    const { recognized, invalid } = parseKeywords(value, AMENITIES_KEYWORDS);
    setRecognizedAmenities(recognized);
    setInvalidAmenities(invalid);
  };

  const handleNeighbourhoodsChange = (e) => {
    const value = e.target.value;
    setNeighbourhoods(value);

    const { recognized, invalid } = parseKeywords(value, NEIGHBOURHOODS_KEYWORDS);
    setRecognizedNeighbourhoods(recognized);
    setInvalidNeighbourhoods(invalid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(estimateRent({
      sqft: Number(sqft),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      amenities: recognizedAmenities.length,
      neighbourhoods: recognizedNeighbourhoods.length,
      rating: Number(rating)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">AI Rent Estimator</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Area (sqft)"
            className="w-full border p-3 rounded"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
          />

          <input
            type="number"
            placeholder="Bedrooms"
            className="w-full border p-3 rounded"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />

          <input
            type="number"
            placeholder="Bathrooms"
            className="w-full border p-3 rounded"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />

          {/* Amenities Input */}
          <input
            type="text"
            placeholder="Amenities (e.g., wifi, parking, gym)"
            className="w-full border p-3 rounded"
            value={amenities}
            onChange={handleAmenitiesChange}
          />
          <div className="mt-1 flex flex-wrap gap-2">
            {recognizedAmenities.map(a => (
              <span key={a} className="bg-green-500 text-white px-2 py-1 rounded text-xs">{a}</span>
            ))}
            {invalidAmenities.map(a => (
              <span key={a} className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs">{a}</span>
            ))}
          </div>

          {/* Nearby Places Input */}
          <input
            type="text"
            placeholder="Nearby Places (e.g., school, hospital)"
            className="w-full border p-3 rounded mt-4"
            value={neighbourhoods}
            onChange={handleNeighbourhoodsChange}
          />
          <div className="mt-1 flex flex-wrap gap-2">
            {recognizedNeighbourhoods.map(n => (
              <span key={n} className="bg-green-500 text-white px-2 py-1 rounded text-xs">{n}</span>
            ))}
            {invalidNeighbourhoods.map(n => (
              <span key={n} className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs">{n}</span>
            ))}
          </div>

          <input
            type="number"
            step="0.1"
            placeholder="Property Rating"
            className="w-full border p-3 rounded mt-4"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded hover:bg-emerald-700"
          >
            Estimate Rent
          </button>
        </form>

        {predictedRent && (
          <div className="mt-6 p-4 bg-green-100 rounded text-center">
            <p className="text-lg font-semibold">Estimated Rent</p>
            <p className="text-2xl font-bold text-green-700">
              ₹{Math.round(predictedRent)} / month
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentEstimator;