import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ products, search, location, Menu }) => {
    const conversionRate = 83;

    // Filter products based on search and location
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.adTitle.toLowerCase().includes(search.toLowerCase());
        const matchesLocation = location ? product.location.toLowerCase().includes(location.toLowerCase()) : true; 
        const matchesMenu = Menu ? product.category?.toLowerCase().includes(Menu.toLowerCase()) : true;

        return matchesSearch && matchesLocation && matchesMenu;
    });

    return (
        <div className="grid grid-cols-4 gap-4 p-5">
            {filteredProducts.map((product) => (
                <Link to="/details" state={{ data: product }} key={product.id}>
                    <div className="border border-spacing-1 p-2 ml-3 mt-3">
                        <img src={product.image || '/placeholder.jpg'} className="w-60 h-48 object-cover" alt="product" />
                        <h1 className="font-bold text-xl">₹{product.salary||product.price}</h1>
                        <h1>{product.adTitle}</h1>
                        <h1>{product.category}</h1>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Home;


