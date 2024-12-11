import React, { useState } from 'react';
import arrow from '../assets/arrow.png';
import Overlay from './Overlay'; // Import the Overlay component

type menuProp = {
    setMenu: any;
};

const Menubar = (props: menuProp) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false); // State for overlay visibility
    const [isPremiumPopupOpen, setIsPremiumPopupOpen] = useState(false); // State for premium popup
    const [searchCategory, setSearchCategory] = useState('');  // State for category search input

    const categories = [
        { name: 'Cars', icon: '🚗', subcategories: ['Car'] },
        { name: 'Properties', icon: '🏡', subcategories: ['For Rent: Home', 'For Sale: Home', 'For Rent: Office', 'For Sale: Office'] },
        { name: 'Mobiles', icon: '📱', subcategories: ['Smartphones', 'Mobile Accessories'] }, // Ensure 'Smartphones' is included
        { name: 'Jobs', icon: '💼', subcategories: ['Full-Time', 'Part-Time', 'Freelance'] },
        { name: 'Bikes', icon: '🏍', subcategories: ['Scooters', 'Motorcycles', 'Electric Bikes'] },
        { name: 'Electronics & Appliances', icon: '💻', subcategories: ['Laptops', 'Refrigerators', 'TV'] },
        { name: 'Commercial Vehicles & Spares', icon: '🚛', subcategories: ['Trucks', 'Buses', 'Spare Parts'] },
        { name: 'Furniture', icon: '🛋', subcategories: ['Living Room', 'Bedroom', 'Office Furniture'] },
        { name: 'Fashion', icon: '👗', subcategories: ['Clothing', 'Accessories', 'Footwear'] },
        { name: 'Books, Sports & Hobbies', icon: '📚', subcategories: ['Books', 'Sports Equipment', 'Hobbies'] },
        { name: 'Pets', icon: '🐕', subcategories: ['Dogs', 'Cats', 'Birds'] },
        { name: 'Services', icon: '🛠', subcategories: ['Home Services', 'Automobile Services', 'Health Services'] },
    ];

    const toggleOverlay = () => {
        setIsOverlayOpen(!isOverlayOpen); // Toggle the overlay state
    };

    const togglePremiumPopup = () => {
        setIsPremiumPopupOpen(!isPremiumPopupOpen); // Toggle the premium popup state
    };

    // Filter categories based on searchCategory state
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchCategory.toLowerCase())
    );

    return (
        <>
            {/* Main container with flex layout for all options in the same line */}
            <div className="flex justify-between items-center shadow-sm h-10 p-2">
                <div className="flex items-center">
                    {/* All Categories button */}
                    <button onClick={toggleOverlay} className="flex items-center bg-slate-100 ml-16 p-2 rounded">
                        <span className="mr-2">All Categories</span>
                        <img src={arrow} className={`w-8 h-7 ${isOverlayOpen ? 'arrow-up' : ''}`} alt="arrow" />
                    </button>

                    {/* Existing Category Options (inline) */}
                    <h1 onClick={() => props.setMenu("Cars")} className="ml-12 cursor-pointer hover:text-green-500">Cars</h1>
                    <h1 onClick={() => props.setMenu("Motorcycles")} className="ml-5 cursor-pointer hover:text-green-500">Motorcycles</h1>
                    <h1 onClick={() => props.setMenu("For Sale")} className="ml-5 cursor-pointer hover:text-green-500">For Sale: Houses & Apartments</h1>
                    <h1 onClick={() => props.setMenu("Scooter")} className="ml-5 cursor-pointer hover:text-green-500">Scooters</h1>
                    <h1 onClick={() => props.setMenu("bus")} className="ml-5 cursor-pointer hover:text-green-500">Commercial & Other Vehicles</h1>
                    <h1 onClick={() => props.setMenu("For Rent")} className="ml-5 cursor-pointer hover:text-green-500">For Rent: Houses & Apartments</h1>
                </div>

                {/* Subscribe to Premium button */}
                <button 
                    onClick={togglePremiumPopup} 
                    className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:from-purple-500 hover:to-red-400 font-semibold flex items-center gap-2 mr-4"
                >
                    <span>💎</span> Subscribe to Premium
                </button>
            </div>

            {/* Overlay for Categories with Search Bar */}
            {isOverlayOpen && (
                <div className="overlay-container">
                    <input 
                        type="text" 
                        placeholder="Search categories..." 
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}  // Handle search input change
                        className="p-2 border rounded w-full mb-4"
                    />
                    <Overlay categories={filteredCategories} onClose={toggleOverlay} />
                </div>
            )}

            {/* Premium Subscription Popup */}
            {isPremiumPopupOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4 text-center">Premium Subscription Benefits</h2>
                        <ul className="text-gray-700 list-disc list-inside mb-6 space-y-2">
                            <li>Exclusive access to high-demand items</li>
                            <li>Faster customer support response times</li>
                            <li>Free featured listings for better visibility</li>
                            <li>Discounts on service fees</li>
                        </ul>
                        <div className="flex justify-between">
                            <button 
                                onClick={() => {
                                    alert("Subscribed to Premium!");
                                    setIsPremiumPopupOpen(false);
                                }} 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                            >
                                Continue to Subscribe
                            </button>
                            <button 
                                onClick={() => setIsPremiumPopupOpen(false)} 
                                className="text-blue-600 hover:underline"
                            >
                                Continue with Free
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Menubar;



