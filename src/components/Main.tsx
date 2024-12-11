import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Menubar from './Menubar';
import Home from './Home';
import Footer from './Footer';
import { db } from '../firebase/setup';
import { collection, onSnapshot } from "firebase/firestore";

const Main = () => {
    const [prod, setProd] = useState([]);  // Products coming from Firebase
    const [search, setSearch] = useState("");  // Search input value
    const [menu, setMenu] = useState("");  // Menu selection
    const [location, setLocation] = useState(""); // Location input value

    // Get products from Firebase
    const getProductsFromFirebase = () => {
        const partTimeJobsCollection = collection(db, 'part_time_jobs');
        const carsCollection = collection(db, 'cars');
        const freelanceCollection = collection(db, 'freelance_jobs');
        const fullTimeJobsCollection = collection(db, 'full_time_jobs');
        const propertiesCollection = collection(db, 'properties'); // Collection for properties
        const mobileAccessoriesCollection = collection(db, 'mobile_accessories'); // Collection for mobile accessories
        const smartphonesCollection = collection(db, 'smartphones'); // Collection for smartphones
        const scootersCollection = collection(db, 'scooters'); // Collection for scooters
        const motorcyclesCollection = collection(db, 'motorcycles'); // Collection for motorcycles
        const electricBikesCollection = collection(db, 'electric_bikes'); // Collection for electric bikes
        const officeAppliancesCollection = collection(db, 'office_appliances'); // Collection for office appliances
        const homeAppliancesCollection = collection(db, 'home_appliances'); // Collection for home appliances
        const kitchenAppliancesCollection = collection(db, 'kitchen_appliances'); // Collection for kitchen appliances
        const busesCollection = collection(db, 'buses'); // Collection for buses
        const trucksCollection = collection(db, 'trucks'); // Collection for trucks
        const sparePartsCollection = collection(db, 'spare_parts'); // Collection for spare parts
        const officeFurnitureCollection = collection(db, 'office_furniture'); // Collection for Office Furniture
        const bedroomFurnitureCollection = collection(db, 'bedroom_furniture'); // Collection for Bedroom Furniture
        const livingRoomFurnitureCollection = collection(db, 'living_room_furniture'); // Collection for Living Room Furniture
        const clothingCollection = collection(db, 'clothing'); // Collection for Clothing
        const accessoriesCollection = collection(db, 'accessories'); // Collection for Accessories
        const footwearCollection = collection(db, 'footwear'); // Collection for Footwear
        const hobbiesCollection = collection(db, 'hobbies'); // Collection for Hobbies
        const sportsEquipmentCollection = collection(db, 'sports_equipment'); // Collection for Sports Equipment
        const booksCollection = collection(db, 'books'); // Collection for Books

        // Fetch part-time jobs
        onSnapshot(partTimeJobsCollection, (partTimeSnapshot) => {
            const partTimeJobs = partTimeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            // Fetch cars
            onSnapshot(carsCollection, (carSnapshot) => {
                const cars = carSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                // Fetch freelance jobs
                onSnapshot(freelanceCollection, (freelanceSnapshot) => {
                    const freelanceJobs = freelanceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                    // Fetch full-time jobs
                    onSnapshot(fullTimeJobsCollection, (fullTimeSnapshot) => {
                        const fullTimeJobs = fullTimeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                        // Fetch properties
                        onSnapshot(propertiesCollection, (propertiesSnapshot) => {
                            const properties = propertiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                            // Fetch mobile accessories
                            onSnapshot(mobileAccessoriesCollection, (accessoriesSnapshot) => {
                                const mobileAccessories = accessoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                // Fetch smartphones
                                onSnapshot(smartphonesCollection, (smartphonesSnapshot) => {
                                    const smartphones = smartphonesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                    // Fetch scooters
                                    onSnapshot(scootersCollection, (scooterSnapshot) => {
                                        const scooters = scooterSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                        // Fetch motorcycles
                                        onSnapshot(motorcyclesCollection, (motorcycleSnapshot) => {
                                            const motorcycles = motorcycleSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                            // Fetch electric bikes
                                            onSnapshot(electricBikesCollection, (electricBikeSnapshot) => {
                                                const electricBikes = electricBikeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                // Fetch office appliances
                                                onSnapshot(officeAppliancesCollection, (officeApplianceSnapshot) => {
                                                    const officeAppliances = officeApplianceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                    // Fetch home appliances
                                                    onSnapshot(homeAppliancesCollection, (homeApplianceSnapshot) => {
                                                        const homeAppliances = homeApplianceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                        // Fetch kitchen appliances
                                                        onSnapshot(kitchenAppliancesCollection, (kitchenApplianceSnapshot) => {
                                                            const kitchenAppliances = kitchenApplianceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                            // Fetch buses
                                                            onSnapshot(busesCollection, (busSnapshot) => {
                                                                const buses = busSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                // Fetch trucks
                                                                onSnapshot(trucksCollection, (truckSnapshot) => {
                                                                    const trucks = truckSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                    // Fetch spare parts
                                                                    onSnapshot(sparePartsCollection, (sparePartsSnapshot) => {
                                                                        const spareParts = sparePartsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                        // Fetch office furniture
                                                                        onSnapshot(officeFurnitureCollection, (officeFurnitureSnapshot) => {
                                                                            const officeFurniture = officeFurnitureSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                            // Fetch bedroom furniture
                                                                            onSnapshot(bedroomFurnitureCollection, (bedroomFurnitureSnapshot) => {
                                                                                const bedroomFurniture = bedroomFurnitureSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                                // Fetch living room furniture
                                                                                onSnapshot(livingRoomFurnitureCollection, (livingRoomFurnitureSnapshot) => {
                                                                                    const livingRoomFurniture = livingRoomFurnitureSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                                    // Fetch clothing
                                                                                    onSnapshot(clothingCollection, (clothingSnapshot) => {
                                                                                        const clothing = clothingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                                        // Fetch accessories
                                                                                        onSnapshot(accessoriesCollection, (accessoriesSnapshot) => {
                                                                                            const accessories = accessoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                                            // Fetch footwear
                                                                                            onSnapshot(footwearCollection, (footwearSnapshot) => {
                                                                                                const footwear = footwearSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                                                // Fetch hobbies
                                                                                                onSnapshot(hobbiesCollection, (hobbiesSnapshot) => {
                                                                                                    const hobbies = hobbiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                                                    // Fetch sports equipment
                                                                                                    onSnapshot(sportsEquipmentCollection, (sportsEquipmentSnapshot) => {
                                                                                                        const sportsEquipment = sportsEquipmentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                                                        // Fetch books
                                                                                                        onSnapshot(booksCollection, (booksSnapshot) => {
                                                                                                            const books = booksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                                                                                                            // Combine all products including new ones
                                                                                                            const combinedProducts = [
                                                                                                                ...partTimeJobs,
                                                                                                                ...cars,
                                                                                                                ...freelanceJobs,
                                                                                                                ...fullTimeJobs,
                                                                                                                ...properties,
                                                                                                                ...mobileAccessories,
                                                                                                                ...smartphones,
                                                                                                                ...scooters,
                                                                                                                ...motorcycles,
                                                                                                                ...electricBikes,
                                                                                                                ...officeAppliances,
                                                                                                                ...homeAppliances,
                                                                                                                ...kitchenAppliances,
                                                                                                                ...buses,
                                                                                                                ...trucks,
                                                                                                                ...spareParts,
                                                                                                                ...officeFurniture,
                                                                                                                ...bedroomFurniture,
                                                                                                                ...livingRoomFurniture,
                                                                                                                ...clothing,
                                                                                                                ...accessories,
                                                                                                                ...footwear,
                                                                                                                ...hobbies,
                                                                                                                ...sportsEquipment,
                                                                                                                ...books,
                                                                                                            ];

                                                                                                            setProd(combinedProducts); // Set products state with combined products
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };

    useEffect(() => {
        getProductsFromFirebase();  // Get products on component load
    }, []);

    return (
        <div>
            <Navbar setSearch={setSearch} setLocation={setLocation} /> {/* Pass setLocation to Navbar */}
            <Menubar setMenu={setMenu} />
            <Home products={prod} search={search} location={location} Menu={menu} />  {/* Pass the location for filtering */}
            <Footer />
        </div>
    );
};

export default Main;





