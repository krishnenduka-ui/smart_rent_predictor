import { useState } from "react";
import { Link } from "react-router-dom";

const Rentals = () => {
  const [view, setView] = useState("grid");

  const properties = [
    {
      id: 1,
      title: "Modern 2 Bedroom Apartment",
      price: 1500,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 1,
      area: 950,
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 2,
      title: "Luxury Studio Downtown",
      price: 2000,
      location: "Los Angeles, CA",
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      image: "https://via.placeholder.com/400x300"
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">


      <section className=" text-center py-14 px-6">
        <h1 className="sm:text-2xl md:text-3xl lg:text-4xl ">Browse Available Rentals</h1>
        <p className="mt-5 sm:text-sm md:text-base lg:text-lg">Find Apartments, studios and houses in your preferred location</p>

        {/* Search Apartments */}
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
          <form className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" placeholder="Location" className="p-3 border rounded" />

            <select className="p-3 border rounded">
              <option>Price Range</option>
              <option>5000 - 10000</option>
              <option>10000 - 15000</option>
              <option>15000+</option>
            </select>

            <select className="p-3 border rounded">
              <option>Bedrooms</option>
              <option>Studio</option>
              <option>1 Bedroom</option>
              <option>2 Bedroom</option>
              <option>3+ Bedrooms</option>
            </select>

            <button className="bg-blue-600 text-white rounded hover:bg-blue-700 transition">Search</button>
          </form>
        </div>

      </section>




      <section className="flex flex-col md:flex-row px-6 py-12 gap-6">

        {/*----Filter-----*/}

        <aside className="sm:w-50 md:w-100 bg-white p-6 rounded shadow">
          <h2 className="font-semibold text-lg mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Property Type</label>
            <select className="w-full p-2 border rounded">
              <option>Select type</option>
              <option>Apartment</option>
              <option>Studio</option>
              <option>House</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Bedrooms</label>
            <select className="w-full p-2 border rounded">
              <option>Bedrooms</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Amenities</label>
            <div className="flex flex-col">
              <label><input type="checkbox" /> Pet-friendly</label>
              <label><input type="checkbox" /> Parking</label>
              <label><input type="checkbox" /> Pool</label>
            </div>
          </div>
        </aside>
        <sidebar>
          <div className="bg-gray-200 h-100 w-250 flex items-center justify-center rounded-lg">
            <p className="text-gray-700">Rental grid will appear here</p>
          </div>
        </sidebar>

      </section>


    </div>





  );
};

export default Rentals;