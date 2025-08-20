import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import './ViewCreator.css';
import { supabase } from '../client.js';
import { useNavigate } from 'react-router-dom';


function ViewCreator() {
  const { name } = useParams();
  const [creatorData, setCreatorData] = useState(null); // use null for "no data yet"
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchCreatorDescription = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("description, imageURL")
        .eq("name", name)
        .single();
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setCreatorData(data);
      }
      setLoading(false);
    };
    fetchCreatorDescription();
  }, [name]);
  
  const handleDelete = async () => {
    await supabase
      .from("creators")
      .delete()
      .eq("name", name);

    navigate("/"); 
  };
  
  if (!creatorData) {
    return (
      <div className="creatorPage">
        <div className="container">
          <p>No data found for {name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="creatorPage">
      <div className="container">
        <div className="creatorHandle">{name}</div>
        <div className="creatorCardContent">
          <div className="creatorImage">
            <img src={creatorData.imageURL || ''} alt={name} />
          </div>
          <div className="creatorDescription">
            {creatorData.description || <p>No description available for this creator.</p>}
          </div>
        </div>
        <div className="editDeleteGrp">
          <button onClick={() => navigate('/')}>Back</button>
          <button onClick={() => window.location.href = `/editCreator/${name}`}>Edit Creator</button>
          <button className="deleter" onClick={() => setShowConfirm(true)}>Delete Creator</button>
        </div>
      </div>
      {showConfirm && (
        <div className="confirmOverlay">
          <div className="confirmContent">
            <h2>Are you sure you want to delete this creator?</h2>
            <div className="confirmBtns">
              <button className="confirmDelete" onClick={handleDelete}>Yes, Delete</button>
              <button className="cancelBtn" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default ViewCreator;
