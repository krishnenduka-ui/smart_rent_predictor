import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProperties } from '../features/propertySlice'
import { useSelector, useDispatch } from 'react-redux'
const Properties = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const properties = useSelector((state) => state.properties.properties)
  const property = properties.find((p) => p.id === Number(id))

  useEffect(() => {
    dispatch(fetchProperties())
  }, [id])

  return (
    <div className='min-h-screen text-center '>
      <div className='flex justify-center items-center gap-4'>
        <img className='w-100 h-100 p-8 ' src={property.image} />
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