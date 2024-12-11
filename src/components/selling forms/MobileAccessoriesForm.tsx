import React, { useState } from 'react';
import './MobileAccessoriesForm.css'; // Ensure you have your CSS for styling
import { db } from '../../firebase/setup'; // Adjust the import path based on your file structure
import { collection, addDoc } from 'firebase/firestore'; // Firestore imports

const MobileAccessoriesForm = () => {
    const [formData, setFormData] = useState({
        accessoryName: '',
        brand: '',
        price: '',
        category: 'MobileAccessories',
        adTitle: '',
        description: '',
        location: '',
        photos: [],
        userName: '',
        phoneNumber: '',
    });

    const [isReview, setIsReview] = useState(false); // Manage review mode
    const [isSubmitting, setIsSubmitting] = useState(false); // Manage submission state
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview the uploaded image

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData({
            ...formData,
            photos: files
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsReview(true); // Switch to review mode
    };

    const handleConfirm = async () => {
        setIsSubmitting(true); // Start submission
        try {
            const docRef = await addDoc(collection(db, 'mobile_accessories'), {
                accessoryName: formData.accessoryName,
                brand: formData.brand,
                category: formData.category,
                price: formData.price,
                adTitle: formData.adTitle,
                description: formData.description,
                location: formData.location,
                userName: formData.userName,
                phoneNumber: formData.phoneNumber,
                image: imagePreview || '/placeholder.jpg', // Use image preview or placeholder
            });

            console.log('Document written with ID: ', docRef.id);
            alert('Mobile accessory details submitted successfully!');
            resetForm(); // Reset the form after successful submission
            setIsReview(false); // Return to form state
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error submitting the mobile accessory details. Please try again.');
        } finally {
            setIsSubmitting(false); // End submission state
        }
    };

    const resetForm = () => {
        setFormData({
            accessoryName: '',
            brand: '',
            category: 'MobileAccessories',
            price: '',
            adTitle: '',
            description: '',
            location: '',
            photos: [],
            userName: '',
            phoneNumber: '',
        });
        setImagePreview(null); // Clear image preview
    };

    return (
        <div className="mobile-accessories-form-container">
            <header className="form-header">
                <h2>POST YOUR MOBILE ACCESSORY AD</h2>
                <div className="category-selector">
                    <span>Selected Category: Mobiles / Mobile Accessories</span>
                </div>
            </header>

            {!isReview ? (
                <form onSubmit={handleSubmit} className="mobile-accessories-form">
                    {/* Accessory Details */}
                    <section className="form-section">
                        <h3>Accessory Details</h3>
                        <hr className="section-divider" />
                        <div className="form-group">
                            <label htmlFor="accessoryName">Accessory Name:</label>
                            <input type="text" id="accessoryName" name="accessoryName" value={formData.accessoryName} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="brand">Brand:</label>
                            <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleInputChange} required />
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
                        <h3>Set a Price</h3>
                        <hr className="section-divider" />
                        <div className="form-group">
                            <label htmlFor="price">Price (₹):</label>
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
                        <p><strong>Accessory Name:</strong> {formData.accessoryName}</p>
                        <p><strong>Brand:</strong> {formData.brand}</p>
                        <p><strong>Price:</strong> ₹{formData.price}</p>
                        <p><strong>Ad Title:</strong> {formData.adTitle}</p>
                        <p><strong>Description:</strong> {formData.description}</p>
                        <p><strong>Location:</strong> {formData.location}</p>
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

export default MobileAccessoriesForm;
