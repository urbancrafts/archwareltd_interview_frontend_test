import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Home from "./components/Home";
import CreeateCampaign from "./components/CreateCampaign";
import CampaignSingle from "./components/CampaignSingle";
import EditCampaign from "./components/EditCampaign";


interface Props{
  color: string;
}

function App(){
  
  const [alertVisible, setAlertVisibility] = useState(false);
   
  

  return (
    <Router>

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Campaign Adverts</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
        <li className="nav-item">
        <Link className="nav-link active" to="/">Home</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link " to="/create_campaign">Create Advert</Link>
        </li>
        
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create_campaign" element={<CreeateCampaign />} />
        <Route path="/campaign/:data_id" element={<CampaignSingle />} />
        <Route path="/edit_campaign/:data_id" element={<EditCampaign />} />
            
      </Routes>

    </Router>
  );
}

export default App;