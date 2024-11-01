import { Link } from 'react-router-dom';


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
  title: string;
}

const CampaignList: React.FC<Props> = ({ campaigns, title }) => {
  return (
    <div className="campaign-list">
      
      {campaigns.map((campaign) => (
        <div className="list-group" key={campaign.id}>
          <div className="list-group-item list-group-item-action" aria-current="true">
          <div className="d-flex w-100 justify-content-between">
          <Link  to={`/campaign/${campaign.id}`}>
      <h5 className="mb-1">{campaign.name}</h5>
      </Link>
      <small>From "{campaign.fromDate}" - "{campaign.toDate}"</small>
      
    </div>
    <div>
        {campaign.imageBanners.map((banner) => (
    
    <img src={banner.imageUrl} className="img-thumbnail" height="200" width="200" alt="..."></img>
    ))}

    
    </div>
    
    
   <small>Daily Budget ({campaign.currency}{campaign.dailyBudget})</small> |  
    <small>Total Budget ({campaign.currency}{campaign.totalBudget})</small> |
    <Link className='fa fa-pencil-square-o' to={`/edit_campaign/${campaign.id}`}>Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
