import React, { useState } from 'react';
import './FreelanceForm.css'; // Ensure you have your CSS for styling
import { db } from '../../firebase/setup'; // Import your Firebase setup
import { collection, addDoc } from 'firebase/firestore'; // Firestore imports

const FreelanceForm = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        skills: '',
        hourlyRate: '',
        description: '',
        location: '',
        photos: [] as File[], // Initialize photos array
        userName: '',
        phoneNumber: '',
        adTitle: '', // Added Ad Title
    });

    const [isReview, setIsReview] = useState(false); // Manage review mode
    const [isSubmitting, setIsSubmitting] = useState(false); // Manage submission state
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview the uploaded image

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle file upload
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

    // Reset the form after submission
    const resetForm = () => {
        setFormData({
            jobTitle: '',
            skills: '',
            hourlyRate: '',
            description: '',
            location: '',
            photos: [], // Reset photos array
            userName: '',
            phoneNumber: '',
            adTitle: '', // Reset Ad Title
        });
        setImagePreview(null); // Clear image preview
    };

    // Submit the form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsReview(true); // Switch to review mode
    };

    // Function to submit the form data to Firebase
    const handleConfirm = async () => {
        setIsSubmitting(true); // Start submission
        try {
            // Save the form data to Firestore
            const docRef = await addDoc(collection(db, 'freelance_jobs'), {
                jobTitle: formData.jobTitle,
                skills: formData.skills,
                hourlyRate: formData.hourlyRate,
                description: formData.description,
                location: formData.location,
                userName: formData.userName,
                phoneNumber: formData.phoneNumber,
                adTitle: formData.adTitle,
                image: imagePreview || '/placeholder.jpg', // Save preview or placeholder image
                category: 'Freelance Job', // Explicitly set the category
                price: formData.hourlyRate, // Use hourly rate as the price
            });

            console.log('Document written with ID: ', docRef.id);

            resetForm(); // Reset the form after submission
            setIsReview(false);
            alert('Freelance job details submitted successfully!');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error submitting the freelance job details. Please try again.');
        } finally {
            setIsSubmitting(false); // End submission state
        }
    };

    return (
        <div className="freelance-form-container">
            <header className="form-header">
                <h2>POST YOUR FREELANCE JOB AD</h2>
                <div className="category-selector">
                    <span>Selected Category: Jobs / Freelance</span>
                </div>
            </header>

            {!isReview ? (
                <form onSubmit={handleSubmit} className="freelance-form">
                    {/* Freelance Job Details */}
                    <section className="form-section">
                        <h3>Job Details</h3>
                        <hr className="section-divider" />
                        <div className="form-group">
                            <label htmlFor="jobTitle">Job Title:</label>
                            <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="skills">Required Skills:</label>
                            <input type="text" id="skills" name="skills" value={formData.skills} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="hourlyRate">Hourly Rate (₹):</label>
                            <input type="number" id="hourlyRate" name="hourlyRate" value={formData.hourlyRate} onChange={handleInputChange} required />
                        </div>
                    </section>

                    {/* Common Ad Fields */}
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
                        <p><strong>Job Title:</strong> {formData.jobTitle}</p>
                        <p><strong>Required Skills:</strong> {formData.skills}</p>
                        <p><strong>Hourly Rate:</strong> ₹{formData.hourlyRate}</p>
                        <p><strong>Ad Title:</strong> {formData.adTitle}</p>
                        <p><strong>Description:</strong> {formData.description}</p>
                        <p><strong>Location:</strong> {formData.location}</p>
                        <p><strong>Uploaded Photos:</strong> {formData.photos.length} uploaded</p>
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

export default FreelanceForm;
