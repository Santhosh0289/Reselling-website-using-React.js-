import React, { useState } from 'react';
import './PropertyForm.css'; // Ensure you have your CSS for styling
import { db } from '../../firebase/setup'; // Import Firebase setup
import { collection, addDoc } from 'firebase/firestore'; // Firestore imports

const PropertyForm = () => {
    const [formData, setFormData] = useState({
        propertyType: '',
        area: '',
        location: '',
        price: '',
        description: '',
        bedrooms: '',
        bathrooms: '',
        furnished: '',
        parking: '',
        adTitle: '', // Ad title field
        userName: '',
        phoneNumber: '',
        photos: [],
    });

    const [isReview, setIsReview] = useState(false); // State to manage review mode
    const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status
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
            photos: files // Handle property photos
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

    // Function to submit the form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsReview(true); // Set review mode to true on submit
    };

    // Function to confirm and submit data to Firestore
    const handleConfirm = async () => {
        setIsSubmitting(true); // Start submission
        try {
            const docRef = await addDoc(collection(db, 'properties'), {
                propertyType: formData.propertyType,
                area: formData.area,
                location: formData.location,
                price: formData.price,
                description: formData.description,
                bedrooms: formData.bedrooms,
                bathrooms: formData.bathrooms,
                furnished: formData.furnished,
                parking: formData.parking,
                adTitle: formData.adTitle, // Add ad title
                userName: formData.userName,
                phoneNumber: formData.phoneNumber,
                image: imagePreview || '/placeholder.jpg', // Save preview or placeholder image
                category: 'Property / For Rent: Home', // Explicitly set the category
                price: formData.price, // Price for the property
            });

            console.log('Document written with ID: ', docRef.id);
            alert('Property details submitted successfully!');
            resetForm(); // Reset the form after submission
            setIsReview(false); // Go back to form view
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error submitting the property details. Please try again.');
        } finally {
            setIsSubmitting(false); // End submission
        }
    };

    // Function to reset the form
    const resetForm = () => {
        setFormData({
            propertyType: '',
            area: '',
            location: '',
            price: '',
            description: '',
            bedrooms: '',
            bathrooms: '',
            furnished: '',
            parking: '',
            adTitle: '',
            userName: '',
            phoneNumber: '',
            photos: [],
        });
        setImagePreview(null); // Clear image preview
    };

    return (
        <div className="property-form-container">
            {/* Header Section */}
            <header className="form-header">
                <h2>POST YOUR AD</h2>
                <div className="category-selector">
                    <span>Selected Category: Properties / For Rent: Home</span> {/* Dynamic selector can be implemented */}
                </div>
            </header>

            {!isReview ? (
                <form onSubmit={handleSubmit} className="property-form">
                    {/* Property Details Section */}
                    <section className="form-section">
                        <h3>Property Details</h3>
                        <hr className="section-divider" />
                        
                        <div className="form-group">
                            <label htmlFor="propertyType">Property Type:</label>
                            <input type="text" id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="area">Area (in sqft):</label>
                            <input type="number" id="area" name="area" value={formData.area} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bedrooms">Number of Bedrooms:</label>
                            <input type="number" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bathrooms">Number of Bathrooms:</label>
                            <input type="number" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="furnished">Furnished:</label>
                            <select id="furnished" name="furnished" value={formData.furnished} onChange={handleInputChange} required>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="parking">Parking Available:</label>
                            <select id="parking" name="parking" value={formData.parking} onChange={handleInputChange} required>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Set a Price (₹):</label>
                            <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required />
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
                        <p><strong>Property Type:</strong> {formData.propertyType}</p>
                        <p><strong>Area:</strong> {formData.area} sqft</p>
                        <p><strong>Bedrooms:</strong> {formData.bedrooms}</p>
                        <p><strong>Bathrooms:</strong> {formData.bathrooms}</p>
                        <p><strong>Furnished:</strong> {formData.furnished}</p>
                        <p><strong>Parking:</strong> {formData.parking}</p>
                        <p><strong>Location:</strong> {formData.location}</p>
                        <p><strong>Price:</strong> ₹{formData.price}</p>
                        <p><strong>Ad Title:</strong> {formData.adTitle}</p>
                        <p><strong>Description:</strong> {formData.description}</p>
                        <p><strong>Photos:</strong> {formData.photos.length} uploaded</p>
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

export default PropertyForm;

