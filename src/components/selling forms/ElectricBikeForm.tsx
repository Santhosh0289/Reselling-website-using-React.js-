import React, { useState } from 'react';
import './ElectricBikeForm.css'; // Ensure you have a corresponding CSS file
import { db } from '../../firebase/setup'; // Import your Firebase setup
import { collection, addDoc } from 'firebase/firestore'; // Firestore imports

const ElectricBikeForm = () => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        batteryCapacity: '',
        range: '',
        transmission: '',
        kmDriven: '',
        owners: '',
        adTitle: '',
        description: '',
        price: '',
        location: '',
        photos: [] as File[], // Initialize photos array
        userName: '', // State for user name
        phoneNumber: '' // State for phone number
    });

    const [isReview, setIsReview] = useState(false); // State to manage review mode
    const [isSubmitting, setIsSubmitting] = useState(false); // State for submitting
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview the uploaded image

    // Function to handle form field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle file upload (for photos)
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData({
            ...formData,
            photos: files // Handle electric bike photos
        });

        // Generate preview for the first image
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to reset the form after submission
    const resetForm = () => {
        setFormData({
            brand: '',
            model: '',
            year: '',
            batteryCapacity: '',
            range: '',
            transmission: '',
            kmDriven: '',
            owners: '',
            adTitle: '',
            description: '',
            price: '',
            location: '',
            photos: [], // Reset photos array
            userName: '', // Reset user name
            phoneNumber: '' // Reset phone number
        });
        setImagePreview(null); // Clear image preview
    };

    // Function to submit the form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsReview(true); // Set review mode to true on submit
    };

    // Function to handle the form submission to Firebase
    const handleConfirm = async () => {
        setIsSubmitting(true); // Start submission
        try {
            const docRef = await addDoc(collection(db, 'electric_bikes'), {
                brand: formData.brand,
                model: formData.model,
                year: formData.year,
                batteryCapacity: formData.batteryCapacity,
                range: formData.range,
                transmission: formData.transmission,
                kmDriven: formData.kmDriven,
                owners: formData.owners,
                adTitle: formData.adTitle,
                description: formData.description,
                price: formData.price,
                location: formData.location,
                userName: formData.userName,
                phoneNumber: formData.phoneNumber,
                image: imagePreview || '/placeholder.jpg', // Save preview or placeholder image
                category: 'Bikes / Electric Bikes', // Explicitly set the category as Bikes
            });

            console.log('Document written with ID: ', docRef.id);
            resetForm(); // Reset the form after successful submission
            setIsReview(false); // Return to form state
            alert('Electric bike details submitted successfully!');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error submitting the electric bike details. Please try again.');
        } finally {
            setIsSubmitting(false); // End submission state
        }
    };

    return (
        <div className="electric-bike-form-container">
            {/* Header Section */}
            <header className="form-header">
                <h2>POST YOUR ELECTRIC BIKE AD</h2>
                <div className="category-selector">
                    <span>Selected Category: Bikes / Electric Bikes</span>
                </div>
            </header>

            {!isReview ? (
                <form onSubmit={handleSubmit} className="electric-bike-form">
                    {/* Electric Bike Details Section */}
                    <section className="form-section">
                        <h3>Electric Bike Details</h3>
                        <hr className="section-divider" />

                        <div className="form-group">
                            <label htmlFor="brand">Brand:</label>
                            <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="model">Model:</label>
                            <input type="text" id="model" name="model" value={formData.model} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="year">Year:</label>
                            <input type="number" id="year" name="year" value={formData.year} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="batteryCapacity">Battery Capacity (kWh):</label>
                            <input type="number" id="batteryCapacity" name="batteryCapacity" value={formData.batteryCapacity} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="range">Range (km):</label>
                            <input type="number" id="range" name="range" value={formData.range} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label>Transmission:</label>
                            <div className="transmission-selector">
                                <label>
                                    <input type="radio" name="transmission" value="Automatic" onChange={handleInputChange} required />
                                    Automatic
                                </label>
                                <label>
                                    <input type="radio" name="transmission" value="Manual" onChange={handleInputChange} required />
                                    Manual
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="kmDriven">KM Driven:</label>
                            <input type="number" id="kmDriven" name="kmDriven" value={formData.kmDriven} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label>Number of Owners:</label>
                            <div className="owner-selector">
                                <label>
                                    <input type="radio" name="owners" value="1" onChange={handleInputChange} required />
                                    1
                                </label>
                                <label>
                                    <input type="radio" name="owners" value="2" onChange={handleInputChange} required />
                                    2
                                </label>
                                <label>
                                    <input type="radio" name="owners" value="3+" onChange={handleInputChange} required />
                                    3+
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Ad Information Section */}
                    <section className="form-section">
                        <h3>Ad Information</h3>
                        <hr className="section-divider" />

                        <div className="form-group">
                            <label htmlFor="adTitle">Ad Title:</label>
                            <input type="text" id="adTitle" name="adTitle" value={formData.adTitle} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required></textarea>
                        </div>
                    </section>

                    {/* Price Section */}
                    <section className="form-section">
                        <h3>Price</h3>
                        <hr className="section-divider" />

                        <div className="form-group">
                            <label htmlFor="price">Set a Price (₹):</label>
                            <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required />
                        </div>
                    </section>

                    {/* Photo Upload Section */}
                    <section className="form-section">
                        <h3>Upload Photos</h3>
                        <hr className="section-divider" />

                        <div className="form-group">
                            <label>Upload up to 20 photos:</label>
                            <input type="file" name="photos" multiple onChange={handleFileUpload} />
                        </div>
                    </section>

                    {/* Confirm Location Section */}
                    <section className="form-section">
                        <h3>Confirm Location</h3>
                        <hr className="section-divider" />

                        <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required />
                        </div>
                    </section>

                    {/* User Info Section */}
                    <section className="form-section user-info">
                        <h3>Your Information</h3>
                        <hr className="section-divider" />

                        <div className="form-group">
                            <label htmlFor="userName">Your Name:</label>
                            <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                        </div>
                    </section>

                    <button type="submit" className="submit-button">Submit</button>
                </form>
            ) : (
                // Review Your Details Section
                <section className="review-section">
                    <h3>Review Your Details</h3>
                    <hr className="section-divider" />
                    <div className="review-details">
                        <p><strong>Brand:</strong> {formData.brand}</p>
                        <p><strong>Model:</strong> {formData.model}</p>
                        <p><strong>Year:</strong> {formData.year}</p>
                        <p><strong>Battery Capacity:</strong> {formData.batteryCapacity} kWh</p>
                        <p><strong>Range:</strong> {formData.range} km</p>
                        <p><strong>Transmission:</strong> {formData.transmission}</p>
                        <p><strong>KM Driven:</strong> {formData.kmDriven}</p>
                        <p><strong>Ad Title:</strong> {formData.adTitle}</p>
                        <p><strong>Description:</strong> {formData.description}</p>
                        <p><strong>Price:</strong> ₹{formData.price}</p>
                        <p><strong>Location:</strong> {formData.location}</p>
                        <p><strong>Photos:</strong> {formData.photos.length} uploaded</p>
                        {imagePreview && <img src={imagePreview} alt="Image Preview" className="w-60 h-48 object-cover" />}
                        <p><strong>Your Name:</strong> {formData.userName}</p>
                        <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
                    </div>
                    <button className="submit-button" onClick={handleConfirm} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Confirm Submission'}
                    </button>
                    <button className="submit-button" onClick={() => setIsReview(false)} disabled={isSubmitting}>
                        Edit Details
                    </button>
                </section>
            )}
        </div>
    );
};

export default ElectricBikeForm;
