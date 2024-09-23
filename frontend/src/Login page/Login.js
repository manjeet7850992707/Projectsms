import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import axios from 'axios';
import { Logincontext } from '../component/context/Logincontext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const { setSuperadminlogin } = useContext(Logincontext); // Use context to update Superadminlogin state

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make an API call to the login endpoint
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      // Handle the response (e.g., save the token, redirect the user)
      if (response.data.message === 'Login successful' || response.data.message === 'Successfully logged in as Super Admin') {
        setSuccess('Login successful!');
        setSuperadminlogin(true); // Update context for Superadminlogin
        localStorage.setItem('Superadminlogin', true); // Store login status in localStorage

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
      <div className="container-fluid border">
        <div className="row border" style={{ height: '99vh' }}>
          {/* Left Side: Login Form */}
          <div className="col-lg-4 d-flex flex-column justify-content-center">
            <div className="login_form">
              <form onSubmit={handleSubmit}>
                <h2 className="mt-4 mb-4">Company Logo</h2>
                <span className="fs-4">Admin Login</span>
                <div className="input_box  mt-4">
                  <label htmlFor="email">User Name</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter User Name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input_box">
                  <div className="password_title">
                    <label htmlFor="password">Password</label>
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

          {/* Right Side: Background Image & Info */}
          <div
            className="col-lg-8 border d-flex justify-content-center align-items-center position-relative"
            style={{ height: '100%' }}
          >
            {/* Background image */}
            <img
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '0',
                right: '0',
                zIndex: '-1',
                objectFit: 'cover',
              }}
              src="https://images.pexels.com/photos/460695/pexels-photo-460695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />

            {/* Inner Content */}
            <div className="Inner-img-div p-3 border">
              <div className="Live-data-div">
                <h3>Example Heading 1</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, pariatur quia repudiandae dignissimos velit delectus libero animi eveniet adipisci illo.
                </p>
                <span className="text-success fs-6">Read More</span>
              </div>
              <div className="Live-data-div">
                <h3>Example Heading 2</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, pariatur quia repudiandae dignissimos velit delectus libero animi eveniet adipisci illo.
                </p>
              </div>
              <div className="Live-data-div">
                <h3>Example Heading 3</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, pariatur quia repudiandae dignissimos velit delectus libero animi eveniet adipisci illo.
                </p>
              </div>
              <div className="Live-data-div">
                <h3>Example Heading 4</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, pariatur quia repudiandae dignissimos velit delectus libero animi eveniet adipisci illo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
