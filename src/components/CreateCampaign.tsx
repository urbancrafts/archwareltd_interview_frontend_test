// src/About.tsx
import { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";


interface FormDataState {
    name: string;
    from_date: Date | string;
    to_date: Date | string;
    daily_budget: number;
    banners: File[];
    previewUrl: string;
  }

const CreeateCampaign: React.FC = () => {

    const [formData, setFormData] = useState<FormDataState>({
        name: '',
        from_date: '',
        to_date: '',
        daily_budget: 0,
        banners: [],
        previewUrl: ''
      });
    
      const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);
      const [successMessage, setSuccessMessage] = useState<string | null>(null);
      const navigate = useNavigate(); // Initialize useNavigate
    
      // Handle input change for text, date, and number fields
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: name === 'daily_budget' ? parseFloat(value) : value,
        }));
      };
    
      // Handle multiple file input change for banners
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFormData((prevData) => ({
            ...prevData,
            banners: Array.from(e.target.files), // Convert FileList to Array
            
          }));

          
          

        }
      };

      // Remove an image from the preview list
  
    
      // Handle form submission
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);
    
        // Prepare form data for submission
        const payload = new FormData();
        payload.append('name', formData.name);
        payload.append('from_date', formData.from_date.toString());
        payload.append('to_date', formData.to_date.toString());
        payload.append('daily_budget', formData.daily_budget.toString());
        formData.banners.forEach((banner) => payload.append('banners[]', banner));
    
        try {
          const response = await fetch('http://127.0.0.1:8000/api/campaign', {
            method: 'POST',
            body: payload,
          });
    
          if (!response.ok) {
            throw new Error('Failed to submit the form');
          }
    
          setSuccessMessage('Campaign created successfully!');
          setFormData({
            name: '',
            from_date: '',
            to_date: '',
            daily_budget: 0,
            banners: [],
            previewUrl: ''
          });
        // Redirect to home after successful submission
        navigate('/');

        } catch (err: any) {
          setError(err.message || 'An error occurred');
        } finally {
          setIsSubmitting(false);
        }
      };

  return (
    <div className="comment-form">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label htmlFor="name">Campaign Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="from_date">Start Date:</label>
        <input
          type="date"
          id="from_date"
          name="from_date"
          value={formData.from_date.toString()}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="to_date">End Date:</label>
        <input
          type="date"
          id="to_date"
          name="to_date"
          value={formData.to_date.toString()}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="daily_budget">Daily Budget:</label>
        <input
          type="number"
          id="daily_budget"
          name="daily_budget"
          value={formData.daily_budget}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="container-fluid my-4">
        <label htmlFor="banners">Upload Banners:</label>
        <input
          type="file"
          id="banners"
          name="banners[]"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          required
        />


      
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Create Campaign'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
      </div>
  );
};

export default CreeateCampaign;
