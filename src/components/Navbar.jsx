import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png'
import { useSelector } from "react-redux";
const Navbar = () => {

    const loggedinUser = useSelector((state) => state.auth.loggedinUser)
    if(loggedinUser){
        return null
    }
  return (
        <div className="flex justify-between bg-emerald-900">
            <div className="flex flex-row">
                <img className=" w-15 h-15 mt-2" src={logo} alt="Rental Logo" />
                <h1 className="p-5 font-bold text-2xl text-white ">Homeworth</h1>
            </div>
            <div className="flex  p-6 gap-3 text-white ">
                <Link to={'/'} className="hover:text-blue-200">Home</Link>
                <Link to={'/rentals'} className="hover:text-blue-200">Rentals</Link>
                <Link to={'/compare'} className="hover:text-blue-200">Compare</Link>
                <Link to={'/neighborhoods'} className="hover:text-blue-200">Neighborhoods</Link>
                <Link to={'/login'} className="hover:text-blue-200">Login</Link>
                 <Link to={'/signup'} className="hover:text-blue-200">SignUp</Link>
            </div>
        </div>

  );
}


export default Navbar