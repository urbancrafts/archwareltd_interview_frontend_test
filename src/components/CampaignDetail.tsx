import { useState } from "react";


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

const CampaignDetail: React.FC<Props> = ({ campaigns }) => {

    

  return (
    
    
    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
    
    
     
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{campaigns[0].name}</h5>
      <small>From "{campaigns[0].fromDate}" - "{campaigns[0].toDate}"</small>
      
    </div>

  <div className="carousel-inner">

  <div className={(campaigns[0].imageBanners[0]) ? "carousel-item active" : "carousel-item"} data-bs-interval="10000">
      <img src={campaigns[0].imageBanners[0].imageUrl} className="d-block w-100" width={200} height={400} />
    </div>

  {campaigns[0].imageBanners.map((campaign) => (

    <div className="carousel-item" data-bs-interval="2000">
      <img src={campaign.imageUrl} className="d-block w-100" width={200} height={400} />
    </div>

    
    ))}
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>


</div>
        

  );
}

export default CampaignDetail;
