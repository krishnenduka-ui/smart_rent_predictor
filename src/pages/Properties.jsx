import { useParams } from "react-router-dom";

const Properties = () => {
  const { id } = useParams();

  
  const properties = [
    {
      id: 1,
      title: "Modern 2 Bedroom Apartment",
      price: 15000,
      image: "https://xhomesg.com.vn/wp-content/uploads/2024/12/thiet-ke-noi-that-chung-cu-2-phong-ngu-28.jpg",
      description: "Beautiful modern apartment with 2 bedrooms."
    },
    {
      id: 2,
      title: "Luxury Studio",
      price: 8000,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/623977897.jpg?k=66fb4d4747d34e6e452f22af88cab233c9bdffc40d3a09e81d1ee22a3f9d9b8d&o=",
      description: "Spacious luxury studio with swimming pool."
    },
    {
      id: 3,
      title: "Cozy Family Home",
      price: 30000,
      image: "https://cdn2.atlantamagazine.com/wp-content/uploads/sites/12/2016/07/0716_mintz01_jherr_oneuseonly.jpg",
      description: "Spacious and modern luxury home with beautiful play area"
    },
  ];

  const property = properties.find(p => p.id === Number(id));

  if (!property) {
    return <h2 className="text-center mt-10">Property not found</h2>;
  }

  return (
    <div className="py-16 px-6 max-w-5xl mx-auto">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-150 object-cover rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-6">{property.title}</h1>

      <p className="text-xl text-gray-600 mt-2">
        {property.price} / month
      </p>

      <p className="mt-4 text-gray-700">
        {property.description}
      </p>
    </div>
  );
};

export default Properties;