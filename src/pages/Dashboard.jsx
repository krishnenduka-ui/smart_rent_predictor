import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between bg-blue-600 p-6 text-white">
        <h1 className="font-bold text-xl  ">My Dashboard</h1>
        <div className="">
          <Link to={'/favorites'} className="p-2 hover:text-gray-300">Favorites</Link>
          <Link to={'/saved-searches'} className="p-2 hover:text-gray-300">Saved Searches</Link>
          <button
            className=" border p-2 rounded hover:text-gray-300"
            onClick={handleLogout}>Logout</button>
        </div>

      </div>

    </div>

  );
}

export default Dashboard;