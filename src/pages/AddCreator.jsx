import { useState } from 'react'
import { supabase } from '../client.js'
import './AddCreator.css'
import { useNavigate } from 'react-router-dom';

function AddCreator() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        description: '',
        imageURL: '',
        mainURL: '',
        secondaryURL: '',
        twitterURL: ''
    });

    const [errors, setErrors] = useState({
        name: false,
        description: false
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Resets error if user types
        if (e.target.name === 'name' && e.target.value.trim() !== '') setErrors(prev => ({ ...prev, name: false }));
        if (e.target.name === 'description' && e.target.value.trim() !== '') setErrors(prev => ({ ...prev, description: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        const newErrors = { name: false, description: false };
        if (!form.name.trim()) {
            newErrors.name = true;
            hasError = true;
        }
        if (!form.description.trim()) {
            newErrors.description = true;
            hasError = true;
        }
        setErrors(newErrors);
        if (hasError) return;

        const { data, error } = await supabase
            .from("creators")
            .insert([form]);
        if (error) {
            console.error(error);
        }
        else {
            console.log("Inserted:", data);
        }
        setForm({
            name: '',
            description: '',
            imageURL: '',
            mainURL: '',
            secondaryURL: '',
            twitterURL: ''
        });

        navigate('/');
    };

    return (
        <div className="add-creator">
            <h1 className="titleAdd">Add Your Creator</h1>

            <form onSubmit={handleSubmit} autoComplete="off" className="creator-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={form.name.trim() === '' ? "true" : "false"}

                />
                <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    maxLength={656} 
                    value={form.description}
                    onChange={handleChange}
                    aria-invalid={form.description.trim() === '' ? "true" : "false"}
                />
                <input
                    type="text"
                    name="imageURL"
                    placeholder="Imgur Picture URL"
                    value={form.imageURL}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="mainURL"
                    placeholder="Twitch URL"
                    value={form.mainURL}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="secondaryURL"
                    placeholder="Youtube URL"
                    value={form.secondaryURL}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="twitterURL"
                    placeholder="Twitter URL"
                    value={form.twitterURL}
                    onChange={handleChange}
                />
                <div className='button-group'>
                <button type="button" onClick={() => navigate('/')}>
                    Cancel
                </button>
                <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddCreator