import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CampaignImg{
    id: number;
    imageUrl: string
}

interface Campaign {
    id: number;
    name: string;
    fromDate: string;
    toDate: string;
    currency: string;
    dailyBudget: number;
    totalBudget: number;
    createdAt: string;
    imageBanners: CampaignImg[];
  }
  
  interface Props {
    campaigns: Campaign[];
  }

  interface FormDataState {
    name: string;
    from_date: Date | string;
    to_date: Date | string;
    daily_budget: number;
   
  }

const EditForm: React.FC<Props> = ({ campaigns }) => {

    const [formData, setFormData] = useState<FormDataState>({
        name: campaigns[0].name,
        from_date: campaigns[0].fromDate,
        to_date: campaigns[0].toDate,
        daily_budget: campaigns[0].dailyBudget
        
      });

    const [data_id, setId] = useState(campaigns[0].id);
    // const [name, setName] = useState(campaigns[0].name);
    // const [from_date, setFromDate] = useState(campaigns[0].fromDate);
    // const [to_date, setTodate] = useState(campaigns[0].toDate);
    // const [daily_budget, setDailyBudget] = useState(campaigns[0].dailyBudget);

    // const [isPending, setIsPending] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);
      const [successMessage, setSuccessMessage] = useState<string | null>(null);
      const navigate = useNavigate(); // Initialize useNavigate
    // const history = useHistory();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: name === 'daily_budget' ? parseFloat(value) : value,
        }));
      };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);
       
       //const comment_object = {name, from_date, to_date, daily_budget};
       
      // Prepare form data for submission
    //   const payload = new FormData();
    //   payload.append('name', formData.name);
    //   payload.append('from_date', formData.from_date.toString());
    //   payload.append('to_date', formData.to_date.toString());
    //   payload.append('daily_budget', formData.daily_budget.toString());
    //   formData.banners.forEach((banner) => payload.append('banners[]', banner));
  
      try {
        const response = await fetch('http://127.0.0.1:8000/api/campaign/'+data_id+'?name='+formData.name+'&from_date='+formData.from_date.toString()+'&to_date='+formData.to_date.toString()+'&daily_budget='+formData.daily_budget.toString(), {
          method: 'PUT',
        //   body: payload,
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit the form');
        }
  
        setSuccessMessage('Campaign created successfully!');
        
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

      

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Create Campaign'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
      </div>
    );
  }
  
  export default EditForm;
  