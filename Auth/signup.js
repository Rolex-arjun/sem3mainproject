import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/signup', formData);
            alert('Signup successful!');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
