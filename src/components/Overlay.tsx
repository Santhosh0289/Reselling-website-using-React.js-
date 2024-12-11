import React from 'react';
import './Overlay.css';

interface Category {
    name: string;
    icon: string;
    subcategories: string[];
}

interface OverlayProps {
    categories: Category[];
    onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ categories, onClose }) => {
    // Function to close overlay when clicked outside of content
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((event.target as HTMLDivElement).classList.contains('overlay')) {
            onClose(); // Close the overlay
        }
    };

    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="overlay-content">
                <button className="close-button" onClick={onClose}>✖</button>
                <h2>Categories</h2>
                <div className="overlay-category-list">
                    {categories.map((category) => (
                        <div key={category.name} className="overlay-category">
                            <span className="category-icon">{category.icon}</span>
                            <span className="category-name">{category.name}</span>
                            <ul>
                                {category.subcategories.map((sub) => (
                                    <li key={sub} className="overlay-subcategory">
                                        {sub}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Overlay;

