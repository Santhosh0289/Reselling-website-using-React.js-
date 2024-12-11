import React, { useState } from 'react';
import './PartTimeJobForm.css';
import { db } from '../../firebase/setup'; // Ensure this path is correct
import { collection, addDoc } from 'firebase/firestore'; // Firestore imports

const PartTimeJobForm = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        company: '',
        location: '',
        duration: '',
        salary: '',
        adTitle: '', // Added Ad Title here
        description: '',
        userName: '',
        phoneNumber: '',
        photos: [] as File[], // Initialize photos array
    });

    const [isReview, setIsReview] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview the uploaded image

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData({
            ...formData,
            photos: files,
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

    const resetForm = () => {
        setFormData({
            jobTitle: '',
            company: '',
            location: '',
            duration: '',
            salary: '',
            adTitle: '', // Reset Ad Title as well
            description: '',
            userName: '',
            phoneNumber: '',
            photos: [], // Reset photos array
        });
        setImagePreview(null); // Clear image preview
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsReview(true); // Set review mode to true on submit
    };

    const handleConfirm = async () => {
        setIsSubmitting(true); // Start submission
        try {
            const docRef = await addDoc(collection(db, 'part_time_jobs'), {
                jobTitle: formData.jobTitle,
                company: formData.company,
                location: formData.location,
                duration: formData.duration,
                salary: formData.salary,
                adTitle: formData.adTitle,
                description: formData.description,
                userName: formData.userName,
                phoneNumber: formData.phoneNumber,
                image: imagePreview || '/placeholder.jpg', // Save preview or placeholder image
                category: 'Part-Time Job', // Explicitly set the category
                price: formData.salary, // Use salary as the price
            });

            console.log('Document written with ID: ', docRef.id);

            resetForm();
            setIsReview(false);
            alert('Job details submitted successfully!');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error submitting the job details. Please try again.');
        } finally {
            setIsSubmitting(false); // End submission state
        }
    };

    return (
        <div className="part-time-job-form-container">
            {/* Header Section with updated title and category */}
            <header className="form-header">
                <h2>POST YOUR AD</h2>
                <div className="category-selector">
                    <span>Selected Category: Jobs / Part-Time</span>
                </div>
            </header>

            {!isReview ? (
                <form onSubmit={handleSubmit} className="part-time-job-form">
                    {/* Job Details Section */}
                    <section className="form-section">
                        <h3>Job Details</h3>
                        <hr className="section-divider" />
                        <div className="form-group">
                            <label htmlFor="jobTitle">Job Title:</label>
                            <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="company">Company:</label>
                            <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="duration">Duration:</label>
                            <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="salary">Salary (₹):</label>
                            <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleInputChange} required />
                        </div>
                    </section>

                    {/* Ad Information */}
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
                <section className="review-section">
                    <h3>Review Your Details</h3>
                    <hr className="section-divider" />
                    <p><strong>Job Title:</strong> {formData.jobTitle}</p>
                    <p><strong>Company:</strong> {formData.company}</p>
                    <p><strong>Location:</strong> {formData.location}</p>
                    <p><strong>Duration:</strong> {formData.duration}</p>
                    <p><strong>Salary:</strong> ₹{formData.salary}</p>
                    <p><strong>Ad Title:</strong> {formData.adTitle}</p>
                    <p><strong>Description:</strong> {formData.description}</p>
                    <p><strong>Photos:</strong> {formData.photos.length} uploaded</p>
                    {imagePreview && <img src={imagePreview} alt="Image Preview" className="w-60 h-48 object-cover" />}
                    <p><strong>Your Name:</strong> {formData.userName}</p>
                    <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
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

export default PartTimeJobForm;
