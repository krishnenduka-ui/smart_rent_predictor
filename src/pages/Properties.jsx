import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProperties } from '../features/propertySlice'
import { useSelector, useDispatch } from 'react-redux'
const Properties = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const properties = useSelector((state) => state.properties.properties)
  const [currentIndex,setCurrentIndex] = useState(0)
  const property = properties.find((p) => p.id === Number(id))

  useEffect(() => {
    dispatch(fetchProperties())
  }, [id])

  

  const nextSlide = () =>{
    if(currentIndex < property.gallery.length - 1){
      setCurrentIndex(currentIndex+1)
      
    }
  }

  const prevSlide = () =>{
    if (currentIndex > 0){
      setCurrentIndex(currentIndex-1)
    }
  }

  return (
    <div className='min-h-screen text-center '>
       
       {/* Slider */}
      <div className='relative w-full max-w-2xl mx-auto mb-6 mt-8'>
        <img
          src={property.gallery[currentIndex]}
          className='w-full h-96 object-cover rounded'
        />

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full ">
          &#10094;
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={currentIndex === property.gallery.length - 1}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full">
          &#10095;
        </button>
      </div>

      <h2 className='text-3xl font-semibold mb-6'>{property.title}</h2>
      <div className='text-lg'>
        <p><label className='font-semibold'>Price of the property:</label>{property.price}<label>per month</label></p>
        <p><label className='font-semibold'>The total area:</label>{property.sqft}<label>sq.ft</label></p>
        <p><label className='font-semibold'>Number of bedrooms:</label>{property.bedrooms}</p>
        <p><label className='font-semibold'>Number of bathrooms:</label>{property.bathrooms}</p>
        <p><label className='font-semibold'>The amenities of the property:</label>
          {property.amenities.join(", ")}
        </p>
      </div>

    </div>

  )
}

export default Properties