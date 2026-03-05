import React from "react";
import { Link } from "react-router-dom";

const SavedSearches = () => {

  const savedSearches = [
    {
      id: 1,
      name: "Apartments in Thrissur",
      location: "Thrissur",
      price: "₹10,000 - ₹20,000",
      bedrooms: "2 BHK",
    },
    {
      id: 2,
      name: "Budget Studios",
      location: "Punkunnam,Thrissur",
      price: "₹5,000 - ₹10,000",
      bedrooms: "Studio",
    },
    {
      id: 3,
      name: "Family Homes",
      location: "Ayyanthole,Thrissur",
      price: "₹15,000 - ₹30,000",
      bedrooms: "3 BHK",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Saved Searches
        </h1>
        <p className="text-gray-600">
          Quickly access your previously saved property searches.
        </p>
      </div>

      {/* Saved Searches Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {savedSearches.map((search) => (
          <div
            key={search.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {search.name}
            </h2>

            <div className=" text-gray-600">
              <p><span className="font-medium">Location:</span> {search.location}</p>
              <p><span className="font-medium">Price Range:</span> {search.price}</p>
              <p><span className="font-medium">Bedrooms:</span> {search.bedrooms}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <Link
                to="/rentals"
                className="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
              >
                View Results
              </Link>

              <button
                className="flex-1 border border-red-500 text-red-500 py-2 rounded hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* Empty State (optional) */}
      {savedSearches.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          <p>No saved searches yet.</p>
          <Link
            to="/rentals"
            className="text-blue-600 font-semibold hover:underline"
          >
            Browse Rentals
          </Link>
        </div>
      )}

    </div>
  );
};

export default SavedSearches;