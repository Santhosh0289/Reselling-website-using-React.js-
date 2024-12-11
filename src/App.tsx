import Details from './components/Details';
import Main from './components/Main';
import SellPage from './components/SellPage';  // Import SellPage component
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust path as needed
import Login from './components/Login'; // Adjust path as needed
import Home from './components/Home'; // Home component
import Header from './components/Header'; // Header component
import Footer from './components/Footer'; // Footer component
import CarForm from './components/selling forms/CarForm'; // CarForm component
import PropertyForm from './components/selling forms/PropertyForm'; // Import PropertyForm
import PropertyForm1 from './components/selling forms/PropertyForm1'; // Import PropertyForm1
import PropertyForm2 from './components/selling forms/PropertyForm2'; // Import PropertyForm2
import PropertyForm3 from './components/selling forms/PropertyForm3'; // Import PropertyForm3
import SmartphoneForm from './components/selling forms/SmartphoneForm'; // Import SmartphoneForm
import MobileAccessoriesForm from './components/selling forms/MobileAccessoriesForm'; // Import new form
import PartTimeJobForm from './components/selling forms/PartTimeJobForm';
import FullTimeJobForm from './components/selling forms/FullTimeJobForm';
import FreelanceForm from './components/selling forms/FreelanceForm';
import ScooterForm from './components/selling forms/ScooterForm'; // Import ScooterForm
import MotorcycleForm from './components/selling forms/MotorcycleForm'; // Import MotorcycleForm
import ElectricBikeForm from './components/selling forms/ElectricBikeForm'; // Import ElectricBikeForm
import OfficeApplianceForm from './components/selling forms/OfficeApplianceForm'; // Import OfficeApplianceForm
import HomeApplianceForm from './components/selling forms/HomeApplianceForm'; // Import HomeApplianceForm
import KitchenApplianceForm from './components/selling forms/KitchenApplianceForm'; // Import KitchenApplianceForm
import SparePartsForm from './components/selling forms/SparePartsForm'; // Import SparePartsForm
import BusForm from './components/selling forms/BusForm'; // Import BusForm
import TruckForm from './components/selling forms/TruckForm'; // Import TruckForm
import OfficeFurnitureForm from './components/selling forms/OfficeFurnitureForm'; // Import OfficeFurnitureForm
import BedroomFurnitureForm from './components/selling forms/BedroomFurnitureForm'; // Import BedroomFurnitureForm
import LivingRoomFurnitureForm from './components/selling forms/LivingRoomForm'; // Import LivingRoomFurnitureForm
import AccessoriesForm from './components/selling forms/AccessoriesForm'; // Import AccessoriesForm
import ClothingForm from './components/selling forms/ClothingForm'; // Import ClothingForm
import FootwearForm from './components/selling forms/FootwearForm'; // Import FootwearForm
import HobbiesForm from './components/selling forms/HobbiesForm'; // Import HobbiesForm
import SportsEquipmentForm from './components/selling forms/SportsEquipmentForm'; // Import SportsEquipmentForm
import BooksForm from './components/selling forms/BooksForm'; // Import BooksForm
import { ProductProvider } from './ProductContext';
import BirdsForm from './components/selling forms/BirdsForm'; // Import BirdsForm
import DogsForm from './components/selling forms/DogsForm'; // Import DogsForm
import CatsForm from './components/selling forms/CatsForm'; // Import CatsForm


const App = () => {
  return (
    <>
     <ProductProvider>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/details' element={<Details />} />
        <Route path='/sell' element={<SellPage />} />  {/* New Route for Sell Page */}
        <Route path="/" element={<Navbar setSearch={() => {}} />} />
        <Route path="/login" element={<Login setLoginPop={undefined} />} />
        <Route path="/home" element={<Home />} /> {/* Home page */}
        <Route path="/sell/car" element={<CarForm />} /> {/* CarForm Route */}
        <Route path="/sell/property" element={<PropertyForm />} /> {/* PropertyForm Route */}
        <Route path="/sell/property1" element={<PropertyForm1 />} /> {/* PropertyForm1 Route */}
        <Route path="/sell/property2" element={<PropertyForm2 />} /> {/* PropertyForm2 Route */}
        <Route path="/sell/property3" element={<PropertyForm3 />} /> {/* PropertyForm3 Route */}
        <Route path="/sell/smartphone" element={<SmartphoneForm />} /> {/* SmartphoneForm Route */}
        <Route path="/sell/mobile-accessories" element={<MobileAccessoriesForm />} /> 
        <Route path="/sell/part-time-job" element={<PartTimeJobForm />}/> 
        <Route path="/sell/full-time-job" element={<FullTimeJobForm />}/> 
        <Route path="/sell/freelance-job" element={<FreelanceForm />}/> 
        <Route path="/sell/scooter" element={<ScooterForm />} /> {/* ScooterForm Route */}
        <Route path="/sell/motorcycle" element={<MotorcycleForm />} /> {/* MotorcycleForm Route */}
        <Route path="/sell/electric-bike" element={<ElectricBikeForm />} /> {/* ElectricBikeForm Route */}
        <Route path="/sell/office-appliance" element={<OfficeApplianceForm />} /> {/* OfficeApplianceForm Route */}
        <Route path="/sell/home-appliance" element={<HomeApplianceForm />} /> {/* HomeApplianceForm Route */}
        <Route path="/sell/kitchen-appliance" element={<KitchenApplianceForm />} /> {/* KitchenApplianceForm Route */}
        <Route path="/sell/spare-parts" element={<SparePartsForm />} /> {/* SparePartsForm Route */}
        <Route path="/sell/bus" element={<BusForm />} /> {/* BusForm Route */}
        <Route path="/sell/truck" element={<TruckForm />} /> {/* TruckForm Route */}
        <Route path="/sell/office-furniture" element={<OfficeFurnitureForm />} /> {/* OfficeFurnitureForm Route */}
        <Route path="/sell/bedroom-furniture" element={<BedroomFurnitureForm />} /> {/* BedroomFurnitureForm Route */}
        <Route path="/sell/living-room-furniture" element={<LivingRoomFurnitureForm />} /> {/* LivingRoomFurnitureForm Route */}
        <Route path="/sell/accessories" element={<AccessoriesForm />} /> {/* AccessoriesForm Route */}
        <Route path="/sell/clothing" element={<ClothingForm />} /> {/* ClothingForm Route */}
        <Route path="/sell/footwear" element={<FootwearForm />} /> {/* FootwearForm Route */}
        <Route path="/sell/hobbies" element={<HobbiesForm />} /> {/* HobbiesForm Route */}
        <Route path="/sell/sports-equipment" element={<SportsEquipmentForm />} /> {/* SportsEquipmentForm Route */}
        <Route path="/sell/books" element={<BooksForm />} /> {/* BooksForm Route */}
        <Route path="/sell/birds" element={<BirdsForm />} /> {/* BirdsForm Route */}
        <Route path="/sell/dogs" element={<DogsForm />} /> {/* DogsForm Route */}
        <Route path="/sell/cats" element={<CatsForm />} /> {/* CatsForm Route */}
      </Routes>
      </ProductProvider>
    </>
  );
};

export default App;
