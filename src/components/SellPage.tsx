import React, { useState } from 'react';
import './SellPage.css';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';

const SellPage: React.FC = () => {
    const categories = [
        { name: 'Cars', icon: '🚗', subcategories: ['Car'] },
        { name: 'Properties', icon: '🏡', subcategories: ['For Rent: Home', 'For Sale: Home', 'For Rent: Office', 'For Sale: Office'] },
        { name: 'Mobiles', icon: '📱', subcategories: ['Smartphones', 'Mobile Accessories'] }, // Ensure 'Smartphones' is included
        { name: 'Jobs', icon: '💼', subcategories: ['Full-Time', 'Part-Time', 'Freelance'] },
        { name: 'Bikes', icon: '🏍', subcategories: ['Scooters', 'Motorcycles', 'Electric Bikes'] },
        { name: 'Electronics & Appliances', icon: '💻', subcategories: ['Home Appliances','Office Appliance', 'Kitchen Appliances'] },
        { name: 'Commercial Vehicles & Spares', icon: '🚛', subcategories: ['Trucks', 'Buses', 'Spare Parts'] },
        { name: 'Furniture', icon: '🛋', subcategories: ['Living Room', 'Bedroom', 'Office Furniture'] },
        { name: 'Fashion', icon: '👗', subcategories: ['Clothing', 'Accessories', 'Footwear'] },
        { name: 'Books, Sports & Hobbies', icon: '📚', subcategories: ['Books', 'Sports Equipment', 'Hobbies'] },
        { name: 'Pets', icon: '🐕', subcategories: ['Dogs', 'Cats', 'Birds'] },
        { name: 'girls', icon: '👩', subcategories: ['standards', 'relationship', 'gilma'] },
    ];

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const navigate = useNavigate(); // To handle redirection

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(selectedCategory === category ? null : category);
    };

    const handleSubcategoryClick = (subcategory: string) => {
        if (subcategory === 'Car') {
            navigate('/sell/car'); // Redirect to CarForm
        } else if (subcategory === 'For Rent: Home') {
            navigate('/sell/property'); // Redirect to PropertyForm
        } else if (subcategory === 'For Sale: Home') {
            navigate('/sell/property1'); // Redirect to PropertyForm1
        } else if (subcategory === 'For Rent: Office') {
            navigate('/sell/property2'); // Redirect to PropertyForm2
        } else if (subcategory === 'For Sale: Office') {
            navigate('/sell/property3'); // Redirect to PropertyForm3
        } else if (subcategory === 'Smartphones') {
            navigate('/sell/smartphone'); // Redirect to SmartphoneForm
        } else if (subcategory === 'Mobile Accessories') {
            navigate('/sell/mobile-accessories'); // Redirect to MobileAccessoriesForm
        } else if (subcategory === 'Part-Time') {
            navigate('/sell/part-time-job'); // Redirect to PartTimeJobForm
        } else if (subcategory === 'Full-Time') {
            navigate('/sell/full-time-job'); // Redirect to FullTimeJobForm
        } else if (subcategory === 'Freelance') {
            navigate('/sell/freelance-job'); // Redirect to FreelanceForm
        } else if (subcategory === 'Scooters') {
            navigate('/sell/scooter'); // Redirect to ScooterForm
        } else if (subcategory === 'Motorcycles') {
            navigate('/sell/motorcycle'); // Redirect to MotorcycleForm
        } else if (subcategory === 'Electric Bikes') {
            navigate('/sell/electric-bike'); // Redirect to ElectricBikeForm
        } else if (subcategory === 'Office Appliance') {
            navigate('/sell/office-appliance'); // Redirect to OfficeApplianceForm
        } else if (subcategory === 'Home Appliances') {
            navigate('/sell/home-appliance'); // Redirect to HomeApplianceForm
        } else if (subcategory === 'Kitchen Appliances') {
            navigate('/sell/kitchen-appliance'); // Redirect to KitchenApplianceForm
        } else if (subcategory === 'Spare Parts') {
            navigate('/sell/spare-parts'); // Redirect to SparePartsForm
        } else if (subcategory === 'Buses') {
            navigate('/sell/bus'); // Redirect to BusForm
        } else if (subcategory === 'Trucks') {
            navigate('/sell/truck'); // Redirect to TruckForm
        } else if (subcategory === 'Living Room') {
            navigate('/sell/living-room-furniture'); // Redirect to LivingRoomFurnitureForm
        } else if (subcategory === 'Bedroom') {
            navigate('/sell/bedroom-furniture'); // Redirect to BedroomFurnitureForm
        } else if (subcategory === 'Office Furniture') {
            navigate('/sell/office-furniture'); // Redirect to OfficeFurnitureForm
        } else if (subcategory === 'Clothing') {
            navigate('/sell/clothing'); // Redirect to ClothingForm
        } else if (subcategory === 'Accessories') {
            navigate('/sell/accessories'); // Redirect to AccessoriesForm
        } else if (subcategory === 'Footwear') {
            navigate('/sell/footwear'); // Redirect to FootwearForm
        } else if (subcategory === 'Books') {
            navigate('/sell/books'); // Redirect to BooksForm
        } else if (subcategory === 'Sports Equipment') {
            navigate('/sell/sports-equipment'); // Redirect to SportsEquipmentForm
        } else if (subcategory === 'Hobbies') {
            navigate('/sell/hobbies'); // Redirect to HobbiesForm
        } else if (subcategory === 'Birds') {
            navigate('/sell/birds'); // Redirect to BirdsForm
        } else if (subcategory === 'Dogs') {
            navigate('/sell/dogs'); // Redirect to DogsForm
        } else if (subcategory === 'Cats') {
            navigate('/sell/cats'); // Redirect to CatsForm
        }
        // Add more conditions for other subcategories if needed
    };
    
    
    
    
    
    

    return (
        <div className="sell-page-container">
            <header className="sell-header">
                <Link to="/"><span className="back-arrow">←</span></Link>
                <h2>POST YOUR AD</h2>
            </header>

            <div className="sell-box">
                <div className="category-list">
                    {categories.map((category) => (
                        <div
                            className={`category-item ${selectedCategory === category.name ? 'selected' : ''}`}
                            key={category.name}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <span className="category-icon">{category.icon}</span>
                            <span className="category-name">{category.name}</span>
                            <span className="category-arrow">❭</span>
                        </div>
                    ))}
                </div>

                <div className="subcategory-list">
                    {selectedCategory && (
                        <div className="subcategory-container">
                            <ul>
                                {categories.find(c => c.name === selectedCategory)?.subcategories.map(subcategory => (
                                    <li key={subcategory} className="subcategory-button" onClick={() => handleSubcategoryClick(subcategory)}>
                                        {subcategory}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SellPage;
