// ComparePage.jsx
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCompare } from '../features/compareSlice'

const ComparePage = () => {
  const { selectedProperties } = useSelector((state) => state.compare);
  const dispatch = useDispatch();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Compare Rentals</h1>
      
      {selectedProperties.length === 0 ? (
        <p>No properties selected for comparison.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedProperties.map((property) => (
            <div key={property.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <button 
                onClick={() => dispatch(removeFromCompare(property.id))}
                className="text-red-500 text-sm float-right"
              >
                Remove
              </button>
              
              <h2 className="text-xl font-semibold text-blue-700">{property.location}</h2>
              <p className="text-2xl font-bold my-3">${property.price}/mo</p>
              
              <div className="space-y-2 text-gray-600">
                <p>🛏 {property.bedrooms} Bedrooms</p>
                <p>🛀 {property.bathrooms} Bathrooms</p>
                <p>📏 {property.sqft} sqft</p>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800">Amenities:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {property.amenities.map(a => (
                      <span key={a} className="bg-gray-100 text-xs px-2 py-1 rounded-full">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ComparePage;
