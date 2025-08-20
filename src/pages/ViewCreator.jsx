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
        .select("description, imageURL, mainURL, secondaryURL, twitterURL")
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
        <div className="creator-info-links">

                    <>
                        {creatorData.mainURL && <a
                            href={creatorData.mainURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ cursor: "pointer" }}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Twitch--Streamline-Svg-Logos" height="35" width="35">
                                <desc>
                                    Twitch Streamline Icon: https://streamlinehq.com
                                </desc>
                                <path fill="#9462e0ff" d="M2.295775 0.25 0.7631825 4.33705V20.68325H6.380075V23.75h3.0666l3.063525 -3.06675h4.5966l6.13005 -6.12785V0.25H2.295775Zm2.041825 2.0422275h16.85655V13.531575L17.617775 17.1082h-5.61775L8.93735 20.170725V17.1082h-4.59975V2.2922275ZM9.95675 12.511175H12V6.38145h-2.04325v6.129725Zm5.61815 0h2.04285V6.38145h-2.04285v6.129725Z" stroke-width="0.25"></path>
                            </svg>
                        </a>}
                    </>

                    <>
                        {creatorData.secondaryURL && <a
                            href={creatorData.secondaryURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ cursor: "pointer" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#d43636ff"><path d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z" /></svg>
                        </a>}
                    </>

                    <>
                        {creatorData.twitterURL && <a
                            href={creatorData.twitterURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ cursor: "pointer" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#437de9ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                        </a>}
                    </>

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
