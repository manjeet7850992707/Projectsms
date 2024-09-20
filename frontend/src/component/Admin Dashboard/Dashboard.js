import React, { useState, useEffect } from 'react';
// import { FaUser, FaProjectDiagram, FaUserPlus } from 'react-icons/fa';
import './Admin.css'; // Add a custom CSS file for styles
import { Link, Route,Routes } from 'react-router-dom';
import Admincontent from './Admincontent';

const Dashboard = () => {
    

    return (
        <div className={'dark-mode'}>
            {/* Header Section */}
            <header className="dashboard-header d-flex justify-content-between align-items-center">
                <h1>Admin Dashboard</h1>
                <div className="dashboard-controls">
                   
                    <img
                        className="user-avatar"
                        src="https://images.pexels.com/photos/28172953/pexels-photo-28172953/free-photo-of-a-woman-with-a-scarf-on-her-head-in-a-wheat-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                        alt="User"
                    />
                </div>
            </header>

            {/* Main Dashboard Layout */}
            <div className="dashboard-main">
                {/* Sidebar */}
                <aside className="dashboard-sidebar">
                <nav>
            <ul>
                <li><Link to="/addadmin">Add Admin</Link></li>
                <li><Link to="/addemployee">Add Employee</Link></li>
                <li><Link to="/addproject">Add Project</Link></li>
            </ul>
        </nav>

                </aside>

            </div>
        </div>
    );
};

export default Dashboard;
