// src/Home.tsx
import React from 'react';
import CampaignList from './CampaignList';
import useFetch from '../useFetch';

const Home: React.FC = () => {
    const {data:campaigns, isPending, error} = useFetch({ url: 'http://127.0.0.1:8000/api/campaign' });
  return (
    <div className="home">
        {error && <div>{ error }</div>}
        {isPending && <h4>Loading....</h4>}
        {campaigns && <CampaignList campaigns={campaigns} title="All Adverts!" />} 
       </div>
  );
};

export default Home;
