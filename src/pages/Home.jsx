import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import {fetchProperties} from '../features/propertySlice'
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";


const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const properties = useSelector((state) => state.properties.properties)

   useEffect(() => {
      dispatch(fetchProperties());
    }, []);

  const featuredProperties = properties.filter((property) => property.featured===true)
 
  const handleClick = () =>{
    navigate ("/rentals")
  }

  return (
      <div className="min-h-screen">


        <section className="bg-[url('/src/assets/images/bg-image.jpg')] bg-cover bg-center text-white font-bold text-center p-30 h-100">
          <h1 className="sm:text-3xl md:text-4xl lg:text-5xl ">Find Your Perfect Rental</h1>
          <p className="mt-5 sm:text-sm md:text-base lg:text-lg">Smart rent estimation based on location and property features</p>
          <Link to="/rentals">
            <button className="mt-6 bg-white text-gray-600 font-semibold px-6 py-3 rounded hover:text-gray-300">
              Explore rentals
            </button>
          </Link>
        </section>


        {/* ----------------Featured Properties-------------------- */}
        <section className="py-16 px-6">
          <h2 className="text-center sm:text-xl md:text-2xl lg:text-3xl font-bold">Featured Properties</h2>
          <div className=" mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {featuredProperties.map(property => (
             <Link 
               key={property.id}
               to={`/properties/${property.id}`} 
               className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
             >
               <img 
                 src={property.image} 
                 alt={property.title} 
                className="w-full h-80 object-cover"
               />
               <div className="p-4">
                <h3 className="font-semibold text-lg">{property.title}</h3>
                 <p className="text-gray-600 mt-2">{property.price}/month</p>
               </div>
           </Link>
           ))}
         </div>
        </section >
            
        
        {/* ------------------------Map View---------------------- */}
        
        <section className="bg-gray-100 py-16 px-6 text-center">
          <h2 className="text-center sm:text-xl md:text-2xl lg:text-3xl font-bold">Explore Properties on Map</h2>
          <p className="mt-6 text-gray-700">See the properties on map</p>
          <button className="mt-6 bg-emerald-600 text-white font-semibold px-6 py-3 rounded hover:text-gray-300" onClick={handleClick}>
              View Map
          </button>
        
        </section>
        

      </div>

      
  );
}

export default Home