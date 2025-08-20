import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client.js';
import { useParams } from "react-router-dom";

function EditCreator() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [creatorData, setCreatorData] = useState(null);

  const [errors, setErrors] = useState({
          name: false,
          description: false
      });
  
  const handleChange = (e) => {
        setCreatorData({ ...creatorData, [e.target.name]: e.target.value });
        // Resets error if user types
        if (e.target.name === 'name' && e.target.value.trim() !== '') setErrors(prev => ({ ...prev, name: false }));
        if (e.target.name === 'description' && e.target.value.trim() !== '') setErrors(prev => ({ ...prev, description: false }));
    };

  useEffect(() => {
    const fetchCreatorData = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("name, description, imageURL, mainURL, secondaryURL, twitterURL")
        .eq("name", name)
        .single();
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setCreatorData(data);
      }
      
    };
    fetchCreatorData();
  }, [name]);

  const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        const newErrors = { name: false, description: false };
        if (!creatorData.name.trim()) {
            newErrors.name = true;
            hasError = true;
        }
        if (!creatorData.description.trim()) {
            newErrors.description = true;
            hasError = true;
        }
        setErrors(newErrors);
        if (hasError) return;

        const { data, error } = await supabase
  .from("creators")
  .update({
    name: creatorData.name,
    description: creatorData.description,
    imageURL: creatorData.imageURL,
    mainURL: creatorData.mainURL,
    secondaryURL: creatorData.secondaryURL,
    twitterURL: creatorData.twitterURL
  })
  .eq("name", name); 
        if (error) {
            console.error(error);
        }
        navigate('/');
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
    <div className="add-creator">
            <h1 className="titleAdd">Edit The Creator</h1>

            <form onSubmit={handleSubmit} autoComplete="off" className="creator-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={creatorData.name}
                    onChange={handleChange}
                    aria-invalid={creatorData.name.trim() === '' ? "true" : "false"}

                />
                <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    maxLength={656} 
                    value={creatorData.description}
                    onChange={handleChange}
                    aria-invalid={creatorData.description.trim() === '' ? "true" : "false"}
                />
                <input
                    type="text"
                    name="imageURL"
                    placeholder="Imgur Picture URL"
                    value={creatorData.imageURL}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="mainURL"
                    placeholder="Twitch URL"
                    value={creatorData.mainURL}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="secondaryURL"
                    placeholder="Youtube URL"
                    value={creatorData.secondaryURL}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="twitterURL"
                    placeholder="Twitter URL"
                    value={creatorData.twitterURL}
                    onChange={handleChange}
                />
                <div className='button-group'>
                <button type="button" onClick={() => navigate('/')}>
                    Cancel
                </button>
                <button type="submit">Save</button>
                </div>
            </form>
        </div>
  )
}

export default EditCreator