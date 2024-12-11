import React, { useState, useEffect } from 'react';
import olx from '../assets/olx.png';
import arrow from '../assets/arrow.png';
import search from '../assets/search.png';
import './Navbar.css';
import { useNavigate } from 'react-router-dom'; 
import Login from './Login'; 
import { auth } from '../firebase/setup'; // Firebase auth for login state

const Navbar = (props: { setSearch: any; setLocation: any }) => {
    const [loginPop, setLoginPop] = useState(false); 
    const [user, setUser] = useState(null); // State to track if user is logged in
    const [location, setLocation] = useState(''); 
    const [showOptions, setShowOptions] = useState(false); 
    const [isOthersSelected, setIsOthersSelected] = useState(false);
    const [customLocation, setCustomLocation] = useState(''); 
    const navigate = useNavigate(); 

    // Set up authentication listener to track if the user is logged in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    // Predefined locations in India
    const locations = [
        'Get Current Location',
        'Chennai',
        'Kaniyakumari',
        'Bangalore',
        'Hyderabad',
        'Kolkata',
        'Delhi',
        'Mumbai',
        'Ahmedabad',
        'Pune',
        'Jaipur',
        'Others', 
    ];

    // Function to get the current location using the Geolocation API
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationName = await getLocationName(latitude, longitude);
                    setLocation(locationName);
                    props.setLocation(locationName); // Use the selected location for filtering
                    setShowOptions(false); // Close options after selecting
                },
                (error) => {
                    console.error("Error getting location", error);
                    setLocation('Unable to retrieve location');
                }
            );
        } else {
            setLocation('Geolocation not supported');
        }
    };

    // Function to convert lat/long to location name using Nominatim API
    const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await response.json();
            return data.display_name || 'Location not found';
        } catch (error) {
            console.error("Error fetching location name:", error);
            return 'Location not found';
        }
    };

    // Function to handle location selection
    const handleLocationSelect = (selectedLocation: string) => {
        if (selectedLocation === 'Get Current Location') {
            getCurrentLocation();
        } else if (selectedLocation === 'Others') {
            setIsOthersSelected(true);
            setShowOptions(true); 
            setCustomLocation(''); 
        } else {
            setLocation(selectedLocation);
            props.setLocation(selectedLocation); // Set the location in the search filter
            setIsOthersSelected(false); // Deselect Others when a predefined location is selected
            setShowOptions(false); // Close options after selection
        }
    };

    const handleCustomLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomLocation(e.target.value);
        props.setLocation(e.target.value); // Update the filter with the custom input
    };

    return (
        <>
            <div className="flex p-4 pl-5 bg-slate-100 shadow-md justify-between">
                <img src={olx} className="w-18 h-16 " alt="DejaVend" />
    
                {/* Location Input Dropdown */}
                <div className="relative ml-5 mt-1.5">
                    <button
                        onClick={() => setShowOptions(!showOptions)}
                        className="flex border-2 border-spacing-1 w-64 p-2 border-black bg-slate-100 h-10 overflow-hidden"
                    >
                        <span className="flex-grow overflow-ellipsis overflow-hidden whitespace-nowrap">{location || 'Select Location'}</span>
                        <img src={arrow} className={`ml-1 w-8 h-7 ${showOptions ? 'arrow-up' : ''}`} alt="Arrow" />
                    </button>
                    {showOptions && (
                        <ul className="absolute z-10 w-64 border border-black bg-white max-h-48 overflow-y-auto">
                            {locations.map((loc) => (
                                <li
                                    key={loc}
                                    className="cursor-pointer hover:bg-gray-200 p-2"
                                    onClick={() => handleLocationSelect(loc)}
                                >
                                    {loc}
                                </li>
                            ))}
                            {isOthersSelected && (
                                <li className="p-2">
                                    <input
                                        type="text"
                                        value={customLocation}
                                        onChange={handleCustomLocationChange}
                                        placeholder="Type your location"
                                        className="border rounded p-1 w-full"
                                    />
                                </li>
                            )}
                        </ul>
                    )}
                </div>
    
                {/* Search Input */}
                <div className="flex h-12 ml-4 border-2 border-black">
                    <input
                        onChange={(e) => props.setSearch(e.target.value)}
                        type="text"
                        placeholder="Find Cars, Mobiles, and More"
                        className="ml-3 w-[600px] outline-none bg-slate-100"
                    />
                    <img src={search} className="" alt="Search" />
                </div>
    
                {/* Language and Login Button */}
                <div className="flex h-12 p-3 ml-7 cursor-pointer">
                    <h1 className="font-semibold">ENGLISH</h1>
                    <img src={arrow} className="w-8 h-7" alt="Arrow" />
                </div>
    
                {/* Conditional Login Button */}
                {!user && (
                    <div
                        onClick={() => setLoginPop(true)} // Open the Login Popup
                        className="flex h-12 p-3 ml-7 cursor-pointer underline hover:no-underline"
                    >
                        <h1 className="font-bold text-lg">LOGIN</h1>
                    </div>
                )}
    
                {/* Enhanced Sell Button */}
                <div
                    onClick={() => navigate('/sell')} // Redirect to Sell Page
                    className="w-28 flex h-12 p-2 ml-8 cursor-pointer rounded-full border border-yellow-500 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold items-center justify-center hover:shadow-lg hover:scale-105 transform transition-transform duration-200"
                >
                    <h1 className="text-lg">+ SELL</h1>
                </div>
            </div>
    
            {/* Include Login Popup */}
            {loginPop && <Login setLoginPop={setLoginPop} />} {/* Pass setLoginPop to Login component */}
        </>
    );
    
};

export default Navbar;
