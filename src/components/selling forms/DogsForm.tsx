import React, { useState } from 'react';
import './DogsForm.css'; // Ensure you have your CSS for styling
import { db } from '../../firebase/setup'; // Import Firebase setup
import { collection, addDoc } from 'firebase/firestore'; // Firestore imports

const DogsForm = () => {
    const [formData, setFormData] = useState({
        dogName: '',
        breed: '',
        age: '',
        weight: '',
        color: '',
        vaccinationStatus: '',
        price: '',
        location: '',
        adTitle: '',
        description: '',
        userName: '',
        phoneNumber: '',
        photos: [] as File[], // Initialize photos array
        category: 'Pets / Dogs', // Static category for Dogs
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
            photos: files // Handle dog photos
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
            dogName: '',
            breed: '',
            age: '',
            weight: '',
            color: '',
            vaccinationStatus: '',
            price: '',
            location: '',
            adTitle: '',
            description: '',
            userName: '',
            phoneNumber: '',
            photos: [], // Reset photos array
            category: 'Pets / Dogs', // Reset category
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
            const docRef = await addDoc(collection(db, 'dogs'), {
                dogName: formData.dogName,
                breed: formData.breed,
                age: formData.age,
                weight: formData.weight,
                color: formData.color,
                vaccinationStatus: formData.vaccinationStatus,
                price: formData.price,
                location: formData.location,
                adTitle: formData.adTitle,
                description: formData.description,
                userName: formData.userName,
                phoneNumber: formData.phoneNumber,
                image: imagePreview || '/placeholder.jpg', // Save preview or placeholder image
                category: formData.category, // Save the category to Firestore
            });

            console.log('Document written with ID: ', docRef.id);
            resetForm();
            setIsReview(false);
            alert('Dog details submitted successfully!');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error submitting the dog details. Please try again.');
        } finally {
            setIsSubmitting(false); // End submission state
        }
    };

    return (
        <div className="dogs-form-container">
            {/* Header Section */}
            <header className="form-header">
                <h2>POST YOUR DOG AD</h2>
                <div className="category-selector">
                    <span>Selected Category: {formData.category}</span> {/* Display selected category */}
                </div>
            </header>

            {!isReview ? (
                <form onSubmit={handleSubmit} className="dogs-form">
                    {/* Dog Details Section */}
                    <section className="form-section">
                        <h3>Dog Details</h3>
                        <hr className="section-divider" />

                        <div className="form-group">
                            <label htmlFor="dogName">Dog Name:</label>
                            <input type="text" id="dogName" name="dogName" value={formData.dogName} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="breed">Breed:</label>
                            <input type="text" id="breed" name="breed" value={formData.breed} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Age (in years):</label>
                            <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="weight">Weight (in kg):</label>
                            <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="color">Color:</label>
                            <input type="text" id="color" name="color" value={formData.color} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vaccinationStatus">Vaccination Status:</label>
                            <input type="text" id="vaccinationStatus" name="vaccinationStatus" value={formData.vaccinationStatus} onChange={handleInputChange} required />
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
                        <p><strong>Dog Name:</strong> {formData.dogName}</p>
                        <p><strong>Breed:</strong> {formData.breed}</p>
                        <p><strong>Age:</strong> {formData.age} years</p>
                        <p><strong>Weight:</strong> {formData.weight} kg</p>
                        <p><strong>Color:</strong> {formData.color}</p>
                        <p><strong>Vaccination Status:</strong> {formData.vaccinationStatus}</p>
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

export default DogsForm;
