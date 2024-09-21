import React, { useState } from 'react';
import { FaSignOutAlt, FaUser, FaPhone, FaEnvelope, FaBuilding, FaBriefcase } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import './ademp.css';

function Ademform() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    department: 'IT',
    jobProfile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add functionality to save the data here
  };

  return (
    <>
 <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Admin Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Navigation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link text-center" to="/addadmin">Add Admin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-center" to="/addemployee">Add Employee</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-center" to="/addproject">Add Project</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-center" to="/logout">
                                        <FaSignOutAlt className="logout-icon" /> Log Out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

      <div className='form-container text-center'>
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <FaUser /> Name
            </label>
            <input
              type="text"
              className="form-input"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="number" className="form-label">
              <FaPhone /> Phone Number
            </label>
            <input
              type="tel"
              className="form-input"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              className="form-input"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department" className="form-label">
              <FaBuilding /> Department
            </label>
            <select
              className="form-select"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="IT">IT</option>
              <option value="Non-IT">Non-IT</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="jobProfile" className="form-label">
              <FaBriefcase /> Job Profile
            </label>
            <input
              type="text"
              className="form-input"
              id="jobProfile"
              name="jobProfile"
              value={formData.jobProfile}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Save Data</button>
        </form>
      </div>
    </>
  );
}

export default Ademform;
