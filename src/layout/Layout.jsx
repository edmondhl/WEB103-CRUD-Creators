import React from 'react'
import './Layout.css'
import { useEffect, useState} from 'react'
import { supabase } from '../client.js'
import CreatorInfo from '../components/CreatorInfo.jsx'
import { useNavigate } from 'react-router-dom';


function Layout() {
  const navigate= useNavigate();
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from("creators") 
        .select("*"); 
        
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setCreators(data);
      }
    };

    fetchCreators();
  }, []);

  return (
    <div className="layout">
      <div className="container-fluid">
        <h1 className="title">StreamerVerse</h1>
        <div className="btn-group">
          <button onClick={()=> document.getElementById("cards")?.scrollIntoView({ behavior: "smooth"})}>View All Creators</button>
          <button onClick={()=> navigate('/addCreator')}>Add A Creator</button>
        </div>
      </div>

    <div className="content" id="cards">
          {creators.map((creator) => (
            <CreatorInfo 
              key={creator.name} 
              name={creator.name} 
              description={creator.description} 
              imageURL={creator.imageURL} 
              mainURL={creator.mainURL}
              secondaryURL={creator.secondaryURL}
              twitterURL={creator.twitterURL}
            />
          ))}
        </div>
      
    </div>
  )
}

export default Layout