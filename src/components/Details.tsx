import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar
import Menubar from './Menubar'; // Import Menubar
import Footer from './Footer'; // Import Footer
import './Details.css'; // Import CSS for styling

const Details = () => {
  const location = useLocation();
  const product = location.state?.data; // Access the product details from the state

  if (!product) {
    return <div>Product details not available</div>;
  }

  return (
    <div className="details-container">
      <Navbar setSearch={() => {}} />
      <Menubar setMenu={() => {}} />

      <div className="details-content">
        {/* Left Section: Main Image */}
        <div className="image-section box">
          <img src={product.image || '/placeholder.jpg'} alt="Product" className="product-image" />
        </div>

        {/* Right Section: Product Details */}
        <div className="product-details box">
          <h2 className="ad-title">{product.adTitle}</h2>
          <h3 className="attribute-title">Category: <span>{product.category}</span></h3>
          <h3 className="attribute-title">Price: <span>₹{product.salary || product.price}</span></h3>
          <h3 className="attribute-title">Location: <span>{product.location || product.price}</span></h3>
          
          <button 
            className="make-offer-button" 
            onClick={() => window.open(`https://wa.me/91${product.phoneNumber}`, "_blank")}
          >
            Make Offer
          </button>

          {/* Seller's Contact Information */}
          <div className="contact-details">
            <h4 className="attribute-title">Contact Seller:</h4>
            <p>Username: <span>{product.userName}</span></p>
            <p>Phone: <span>{product.phoneNumber}</span></p>
          </div>

          {/* Overview Section */}
          <div className="overview-section box">
            <h3 className="attribute-title">Overview</h3>
            <ul>
              {product.category === 'Part-Time Job' && (
                <>
                  <li><strong>Job Title:</strong> {product.jobTitle}</li>
                  <li><strong>Company:</strong> {product.company}</li>
                  <li><strong>Location:</strong> {product.location}</li>
                  <li><strong>Duration:</strong> {product.duration}</li>
                  <li><strong>Salary:</strong> ₹{product.salary}</li>
                </>
              )}
              {product.category === 'Full-Time Job' && (
                <>
                  <li><strong>Job Title:</strong> {product.jobTitle}</li>
                  <li><strong>Company:</strong> {product.companyName}</li>
                  <li><strong>Experience Required:</strong> {product.experienceRequired} years</li>
                  <li><strong>Salary:</strong> ₹{product.salary}</li>
                  <li><strong>Location:</strong> {product.location}</li>
                </>
              )}
              {product.category === 'Freelance Job' && (
                <>
                  <li><strong>Job Title:</strong> {product.jobTitle}</li>
                  <li><strong>Skills:</strong> {product.skills}</li>
                  <li><strong>Hourly Rate:</strong> ₹{product.hourlyRate}</li>
                </>
              )}
              {product.category === 'Cars' && (
                <>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Year:</strong> {product.year}</li>
                  <li><strong>Fuel Type:</strong> {product.fuelType}</li>
                  <li><strong>Transmission:</strong> {product.transmission}</li>
                  <li><strong>KM Driven:</strong> {product.kmDriven}</li>
                </>
              )}
              {product.category === 'Smartphone' && (
                <>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Model:</strong> {product.model}</li>
                  <li><strong>Storage:</strong> {product.storage} GB</li>
                  <li><strong>RAM:</strong> {product.ram} GB</li>
                  <li><strong>Battery:</strong> {product.battery} mAh</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                  <li><strong>Price:</strong> ₹{product.price}</li>
                </>
              )}
              {product.category === 'MobileAccessories' && (
                <>
                  <li><strong>Accessory Name:</strong> {product.accessoryName}</li>
                  <li><strong>Brand:</strong> {product.brand}</li>
                </>
              )}
              {product.category === 'Property / For Rent: Home' && (
                <>
                  <li><strong>Property Type:</strong> {product.propertyType}</li>
                  <li><strong>Area:</strong> {product.area} sqft</li>
                  <li><strong>Bedrooms:</strong> {product.bedrooms}</li>
                  <li><strong>Bathrooms:</strong> {product.bathrooms}</li>
                  <li><strong>Furnished:</strong> {product.furnished}</li>
                  <li><strong>Parking:</strong> {product.parking}</li>
                </>
              )}
              {product.category === 'Properties / For Sale: Home' && (
                <>
                  <li><strong>Property Type:</strong> {product.propertyType}</li>
                  <li><strong>Area:</strong> {product.area} sqft</li>
                  <li><strong>Bedrooms:</strong> {product.bedrooms}</li>
                  <li><strong>Bathrooms:</strong> {product.bathrooms}</li>
                  <li><strong>Furnished:</strong> {product.furnished}</li>
                  <li><strong>Parking:</strong> {product.parking}</li>
                </>
              )}
              {product.category === 'Property / For Rent: Office' && (
                <>
                  <li><strong>Property Type:</strong> {product.propertyType}</li>
                  <li><strong>Area:</strong> {product.area} sqft</li>
                  <li><strong>Bathrooms:</strong> {product.bathrooms}</li>
                  <li><strong>Furnished:</strong> {product.furnished}</li>
                  <li><strong>Parking:</strong> {product.parking}</li>
                </>
              )}
              {product.category === 'Property / For Sale: Office' && (
                <>
                  <li><strong>Property Type:</strong> {product.propertyType}</li>
                  <li><strong>Area:</strong> {product.area} sqft</li>
                  <li><strong>Bathrooms:</strong> {product.bathrooms}</li>
                  <li><strong>Furnished:</strong> {product.furnished}</li>
                  <li><strong>Parking:</strong> {product.parking}</li>
                </>
              )}
              {product.category === 'Bikes / Scooter' && (
                <>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Model:</strong> {product.model}</li>
                  <li><strong>Year:</strong> {product.year}</li>
                  <li><strong>Fuel Type:</strong> {product.fuelType}</li>
                  <li><strong>Transmission:</strong> {product.transmission}</li>
                  <li><strong>KM Driven:</strong> {product.kmDriven}</li>
                </>
              )}
              {product.category === 'Bikes / Motorcycles' && (
                <>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Model:</strong> {product.model}</li>
                  <li><strong>Year:</strong> {product.year}</li>
                  <li><strong>Fuel Type:</strong> {product.fuelType}</li>
                  <li><strong>Transmission:</strong> {product.transmission}</li>
                  <li><strong>KM Driven:</strong> {product.kmDriven}</li>
                </>
              )}
              {product.category === 'Bikes / Electric Bikes' && (
                <>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Model:</strong> {product.model}</li>
                  <li><strong>Battery Capacity:</strong> {product.batteryCapacity} mAh</li>
                  <li><strong>Range:</strong> {product.range} km</li>
                  <li><strong>Charging Time:</strong> {product.chargingTime} hours</li>
                </>
              )}
              {product.category === 'Electronics & Appliances / Office Appliance' && (
                <>
                  <li><strong>Application Name:</strong> {product.applianceName} W</li>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Model:</strong> {product.model}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                  
                  <li><strong>Warranty:</strong> {product.warranty} years</li>
                </>
              )}
              {product.category === 'Electronics & Appliances / Home Appliances' && (
                <>
                  <li><strong>Application Name:</strong> {product.applianceName} W</li>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Model:</strong> {product.model}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                  
                  <li><strong>Warranty:</strong> {product.warranty} years</li>
                </>
              )}
              {product.category === 'Electronics & Appliances / Kitchen Appliances' && (
                <>
                <li><strong>Application Name:</strong> {product.applianceName} W</li>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Model:</strong> {product.model}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                  
                  <li><strong>Warranty:</strong> {product.warranty} years</li>
                </>
              )}
                {product.category === 'Commercial Vehicles & Spares / Spare Parts' && (
                <>
                  <li><strong>Part Name:</strong> {product.partName}</li>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Compatibility:</strong> {product.compatibility}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                </>
              )}
              
              {product.category === 'Commercial Vehicles & Spares / Bus' && (
                <>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Model:</strong> {product.model}</li>
                  <li><strong>Seating Capacity:</strong> {product.seatingCapacity}</li>
                  <li><strong>Year:</strong> {product.year}</li>
                  <li><strong>Fuel Type:</strong> {product.fuelType}</li>
                  <li><strong>KM Driven:</strong> {product.kmDriven}</li>
                </>
              )}
              
              {product.category === 'Commercial Vehicles & Spares / Trucks' && (
                <>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Model:</strong> {product.model}</li>
                  <li><strong>Payload Capacity:</strong> {product.payloadCapacity}</li>
                  <li><strong>Year:</strong> {product.year}</li>
                  <li><strong>Fuel Type:</strong> {product.fuelType}</li>
                  <li><strong>KM Driven:</strong> {product.kmDriven}</li>
                </>
              )}
               {product.category === 'Furniture / Office' && (
                <>
                  <li><strong>Furniture Type:</strong> {product.furnitureType}</li>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Material:</strong> {product.material}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                  
                </>
              )}
              {/* Bedroom Furniture Overview */}
              {product.category === 'Furniture / Bedroom' && (
                <>
                  <li><strong>Furniture Type:</strong> {product.furnitureType}</li>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Material:</strong> {product.material}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                
                  
                </>
              )}
              {/* Living Room Furniture Overview */}
              {product.category === 'Furniture / Living Room' && (
                <>
                  <li><strong>Furniture Type:</strong> {product.furnitureType}</li>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Material:</strong> {product.material}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                 
                  
                </>
              )}
               {product.category === 'Fashion / Clothing' && (
                <>
                  <li><strong>Type:</strong> {product.type}</li>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Size:</strong> {product.size}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                  <li><strong>Material:</strong> {product.material}</li>
                </>
              )}
              
              {/* Accessories Overview */}
              {product.category === 'Fashion / Accessories' && (
                <>
                  <li><strong>Accessory Name:</strong> {product.accessoryName}</li>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Type:</strong> {product.type}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                  <li><strong>Material:</strong> {product.material}</li>
                </>
              )}
              
              {/* Footwear Overview */}
              {product.category === 'Fashion / Footwear' && (
                <>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Model:</strong> {product.model}</li>
                  <li><strong>Size:</strong> {product.size}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                  <li><strong>Material:</strong> {product.material}</li>
                </>
              )}
              
              {product.category === 'Books, Sports & Hobbies / Books' && (
                <>
                  <li><strong>Title:</strong> {product.title}</li>
                  <li><strong>Author:</strong> {product.author}</li>
                  <li><strong>Genre:</strong> {product.genre}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                  
                </>
              )}
              {product.category === 'Books, Sports & Hobbies / Sports Equipment' && (
                <>
                  <li><strong> equipmentName:</strong> {product.equipmentName}</li>
                  <li><strong>Brand:</strong> {product.brand}</li>
                  <li><strong>Condition:</strong> {product.condition}</li>
                </>
              )}
              {product.category === 'Books, Sports & Hobbies / Hobbies' && (
                <>
                  <li><strong>Hobby Type:</strong> {product.hobbyName}</li>
                </>
              )}
              {/* Birds Overview */}
{product.category === 'Pets / Birds' && (
    <>
         <li><strong>birdName:</strong> {product.birdName}</li>
        <li><strong>Species:</strong> {product.species}</li>
        <li><strong>Age:</strong> {product.age}</li>
        <li><strong>Color:</strong> {product.color}</li>
        <li><strong>healthStatus:</strong> {product.healthStatus}</li>
    </>
)}

{/* Dogs Overview */}
{product.category === 'Pets / Dogs' && (
    <>
          <li><strong>dogName:</strong> {product.dogName}</li>
        <li><strong>Breed:</strong> {product.breed}</li>
        <li><strong>Age:</strong> {product.age}</li>
        <li><strong>weight:</strong> {product.weight}</li>
        <li><strong>color:</strong> {product.color}</li>
        <li><strong>vaccinationStatus:</strong> {product.vaccinationStatus}</li>
    </>
)}

{/* Cats Overview */}
{product.category === 'Pets / Cats' && (
    <>
        <li><strong>catName:</strong> {product.catName}</li>
        <li><strong>Breed:</strong> {product.breed}</li>
        <li><strong>Age:</strong> {product.age}</li>
        <li><strong>weight:</strong> {product.weight}</li>
        <li><strong>Color:</strong> {product.color}</li>
        <li><strong>vaccinationStatus:</strong> {product.vaccinationStatus}</li>
    </>
)}

              {/* You can add more categories here */}
            </ul>
          </div>
        </div>
      </div>

      {/* Description Section at Full Width */}
      <div className="description-section box">
        <h3 className="attribute-title">Description</h3>
        <p>{product.description}</p>
      </div>

      <Footer />
    </div>
  );
};

export default Details;


