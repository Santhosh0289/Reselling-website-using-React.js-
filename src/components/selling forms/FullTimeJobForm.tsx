import React, { useState } from 'react';
import './FullTimeJobForm.css'; // Ensure you have a corresponding CSS file
import { db } from '../../firebase/setup'; // Adjust the import path based on your file structure
import { collection, addDoc } from 'firebase/firestore'; // Firestore imports

const FullTimeJobForm = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        experienceRequired: '',
        category: 'Full-Time-job', // This will be fixed as 'Full-Time'
        salary: '',
        location: '',
        adTitle: '',
        description: '',
        userName: '',
        phoneNumber: '',
        photos: [] // Added photos field
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
            photos: files // Store the uploaded photos
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
            const docRef = await addDoc(collection(db, 'full_time_jobs'), {
                jobTitle: formData.jobTitle,
                companyName: formData.companyName,
                experienceRequired: formData.experienceRequired,
                category: formData.category,
                salary: formData.salary,
                location: formData.location,
                adTitle: formData.adTitle,
                description: formData.description,
                userName: formData.userName,
                phoneNumber: formData.phoneNumber,
                // Optionally include the first photo for display
                image: imagePreview || '/placeholder.jpg' // Save preview or placeholder image
            });

            console.log('Document written with ID: ', docRef.id);
            alert('Job details submitted successfully!');
            resetForm(); // Optionally reset the form
            setIsReview(false); // Return to form state
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error submitting the job details. Please try again.');
        } finally {
            setIsSubmitting(false); // End submission state
        }
    };

    const resetForm = () => {
        setFormData({
            jobTitle: '',
            companyName: '',
            experienceRequired: '',
            category: 'Full-Time',
            salary: '',
            location: '',
            adTitle: '',
            description: '',
            userName: '',
            phoneNumber: '',
            photos: [] // Reset photos array
        });
        setImagePreview(null); // Clear image preview
    };

    return (
        <div className="full-time-job-form-container">
            <header className="form-header">
                <h2>POST YOUR FULL-TIME JOB AD</h2>
                <div className="category-selector">
                    <span>Selected Category: Jobs / Full-Time-job</span>
                </div>
            </header>

            {!isReview ? (
                <form onSubmit={handleSubmit} className="full-time-job-form">
                    {/* Job Details */}
                    <section className="form-section">
                        <h3>Job Details</h3>
                        <hr className="section-divider" />

                        <div className="form-group">
                            <label htmlFor="jobTitle">Job Title:</label>
                            <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="companyName">Company Name:</label>
                            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="experienceRequired">Experience Required (in years):</label>
                            <input type="number" id="experienceRequired" name="experienceRequired" value={formData.experienceRequired} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="salary">Salary (₹):</label>
                            <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Job Location:</label>
                            <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required />
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
                            <label htmlFor="description">Job Description:</label>
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
                    <div className="review-details">
                        <p><strong>Job Title:</strong> {formData.jobTitle}</p>
                        <p><strong>Company Name:</strong> {formData.companyName}</p>
                        <p><strong>Experience Required:</strong> {formData.experienceRequired} years</p>
                        <p><strong>Salary:</strong> ₹{formData.salary}</p>
                        <p><strong>Job Location:</strong> {formData.location}</p>
                        <p><strong>Ad Title:</strong> {formData.adTitle}</p>
                        <p><strong>Description:</strong> {formData.description}</p>
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

export default FullTimeJobForm;

