
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

import EditForm from "./EditForm";



const EditCampaign: React.FC = () => {
    const { data_id } = useParams();
    const {data:campaigns, isPending, error} = useFetch({ url: 'http://127.0.0.1:8000/api/campaign/single/'+data_id } );
    

    
    

  return (
    <div className="campaign-single">
        {error && <div>{ error }</div>}
        {isPending && <h4>Loading....</h4>}
        {campaigns && <EditForm campaigns={campaigns} />} 
       </div>
  );
}

export default EditCampaign;
