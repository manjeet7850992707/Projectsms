import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make an API call to the login endpoint
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      // Handle the response (e.g., save the token, redirect the user)
      if (response.data.message === 'Login successful' || response.data.message === 'Successfully logged in as Super Admin') {
        setSuccess('Login successful!');
        navigate('/dashboard'); // Redirect to dashboard on successful login
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      // Handle errors (e.g., show error messages)
      setError('Login failed. Please check your credentials and try again.');
      console.error(err);
    }
  };

  return (

    <>
    <div  className="container-fluid border">
      <div style={{height:'100vh'}} className="row border">
        <div style={{height:'100vh'}} className="col-lg-3 border flex-column d-flex justify-content-around ">
          
        
        <div className="login_form m-auto border">
        <h1 className='text-center'>Company</h1>
         
      <form onSubmit={handleSubmit} >
        <h3>Log in with</h3>
        
        <div className="input_box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input_box">
          <div className="password_title">
            <label htmlFor="password">Password</label>
            <a href="/">Forgot Password?</a>
          </div>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
        {error && <p className="error_message">{error}</p>}
        {success && <p className="success_message">{success}</p>}
      </form>
    </div>

        </div>
        <div style={{position:'relative'}} className="col-lg-9 border d-flex justify-content-center align-items-center ">



          <img style={{width:'100%',height:'100%',position:'absolute' ,top:'0',right:'0', zIndex:'-1'}} src="https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg" alt="" />
          <div style={{width:'98%', height:'98%',opacity:'0.5'}} className='border bg-dark '>
        
           

          </div>
        </div>



      </div>

    </div>
   
    </>
  );
};

export default Login;
