import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchProperties} from "../features/propertySlice";
import { addFavorite } from "../features/favoriteSlice";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import {FaUser} from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const properties = useSelector((state) => state.properties.properties);
  const user = useSelector((state) => state.auth.loggedinUser);
  const favorites = useSelector((state) => state.favorites.favorites);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  const handleViewMap = (id) => {

    navigate(`/map/${id}`)
  }
  const handleViewDetails = (id) =>{
    navigate(`/properties/${id}`)
  }
  const handleFavorite = (property) =>{
    
    dispatch(addFavorite(property))
    toast.success("Added to favorites")
  }


  return (
    <div className="min-h-screen bg-gray-200">
      <div className="flex justify-between bg-emerald-900 p-6 text-white">
        <h1 className="font-bold text-xl  ">My Dashboard</h1>
        <div className=" flex flex-row gap-3">
          <Link to={'/favorites'} className="p-2 hover:text-gray-300">Favorites</Link>
          <Link to={'/saved-searches'} className="p-2 hover:text-gray-300">Saved Searches</Link>
          <p className="flex items-center gap-2 p-2"><FaUser/>{user.username}</p>
          <button
            className="flex items-center gap-2 p-2 border rounded hover:text-gray-300 "
            onClick={handleLogout}>
            <FiLogOut className="text-lg" />Logout
          </button>
        </div>

      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-3">
        {
          properties.map((property) => {
            return (
              <div key={property.id}>
                <img className="w-full h-60 object-cover rounded" src={property.image} />
                <h2>{property.title}</h2>
                <p>{property.price}/month</p>
                <p>{property.location}</p>
              
                <div className="flex justify-between">
                <button className="bg-red-400 rounded p-3" onClick={() => handleViewDetails(property.id)}>View Details</button>
                <button className="bg-green-600 rounded p-3 " onClick={() => handleViewMap(property.id)}>View on Map</button>

                <button className="bg-red-400 rounded p-3" onClick={()=>handleFavorite(property)}>Add to favorite</button>
                </div>

              </div>)
          })}


      </div>

    </div>

  );
}

export default Dashboard;