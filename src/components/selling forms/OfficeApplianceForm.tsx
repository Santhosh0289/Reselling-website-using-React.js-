import React, { useState } from 'react';
import './OfficeApplianceForm.css'; // Ensure you have your CSS for styling
import { db } from '../../firebase/setup'; // Import Firebase setup
import { collection, addDoc } from 'firebase/firestore'; // Firestore imports

const OfficeApplianceForm = () => {
    const [formData, setFormData] = useState({
        applianceName: '',
        brand: '',
        model: '',
        condition: '',
        warranty: '',
        price: '',
        location: '',
        category: 'Electronics & Appliances / Office Appliance', // Correct category format
        adTitle: '',
        description: '',
        photos: [] as File[], // Initialize photos array
        userName: '',
        phoneNumber: ''
    });

    const [isReview, setIsReview] = useState(false); // State to manage review mode
    const [isSubmitting, setIsSubmitting] = useState(false); // State for submission
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview the uploaded image

    // Function to handle form field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            photos: files // Handle appliance photos
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
            applianceName: '',
            brand: '',
            model: '',
            condition: '',
            warranty: '',
            category: 'Electronics & Appliances / Office Appliance', // Ensure correct category reset
            price: '',
            location: '',
            adTitle: '',
            description: '',
            photos: [], // Reset photos array
            userName: '',
            phoneNumber: ''
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
            const docRef = await addDoc(collection(db, 'office_appliances'), {
                applianceName: formData.applianceName,
                brand: formData.brand,
                model: formData.model,
                condition: formData.condition,
                warranty: formData.warranty,
                price: formData.price,
                location: formData.location,
                category: formData.category, // Ensure category is sent
                adTitle: formData.adTitle,
                description: formData.description,
                userName: formData.userName,
                phoneNumber: formData.phoneNumber,
                image: imagePreview || '/placeholder.jpg' // Save preview or placeholder image
            });

            console.log('Document written with ID: ', docRef.id);
            resetForm();
            setIsReview(false);
            alert('Office appliance details submitted successfully!');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error submitting the office appliance details. Please try again.');
        } finally {
            setIsSubmitting(false); // End submission state
        }
    };

    return (
        <div className="office-appliance-form-container">
            {/* Header Section */}
            <header className="form-header">
                <h2>POST YOUR OFFICE APPLIANCE AD</h2>
                <div className="category-selector">
                    <span>Selected Category: Electronics & Appliances / Office Appliance</span>
                </div>
            </header>

            {!isReview ? (
                <form onSubmit={handleSubmit} className="office-appliance-form">
                    {/* Appliance Details Section */}
                    <section className="form-section">
                        <h3>Appliance Details</h3>
                        <hr className="section-divider" />

                        <div className="form-group">
                            <label htmlFor="applianceName">Appliance Name:</label>
                            <input type="text" id="applianceName" name="applianceName" value={formData.applianceName} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="brand">Brand:</label>
                            <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="model">Model:</label>
                            <input type="text" id="model" name="model" value={formData.model} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="condition">Condition:</label>
                            <input type="text" id="condition" name="condition" value={formData.condition} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="warranty">Warranty:</label>
                            <input type="text" id="warranty" name="warranty" value={formData.warranty} onChange={handleInputChange} required />
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

                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" className="w-60 h-48 object-cover" />
                            </div>
                        )}
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
                        <p><strong>Appliance Name:</strong> {formData.applianceName}</p>
                        <p><strong>Brand:</strong> {formData.brand}</p>
                        <p><strong>Model:</strong> {formData.model}</p>
                        <p><strong>Condition:</strong> {formData.condition}</p>
                        <p><strong>Warranty:</strong> {formData.warranty}</p>
                        <p><strong>Price:</strong> ₹{formData.price}</p>
                        <p><strong>Location:</strong> {formData.location}</p>
                        <p><strong>Ad Title:</strong> {formData.adTitle}</p>
                        <p><strong>Description:</strong> {formData.description}</p>
                        <p><strong>Photos:</strong> {formData.photos.length} uploaded</p>
                        {imagePreview && <img src={imagePreview} alt="Image Preview" className="w-60 h-48 object-cover" />}
                        <p><strong>Your Name:</strong> {formData.userName}</p>
                        <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
                    </div>
                    <button className="submit-button" onClick={handleConfirm}>
                        Confirm Submission
                    </button>
                    <button className="submit-button" onClick={() => setIsReview(false)}>
                        Edit Details
                    </button>
                </section>
            )}
        </div>
    );
};

export default OfficeApplianceForm;
