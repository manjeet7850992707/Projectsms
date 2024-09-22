import React, { useState } from 'react';
import './Dashboard.css';
import { IoNotifications } from "react-icons/io5";
import { CiPower } from "react-icons/ci";
import { MdMessage, MdOutlineMenu, MdHome } from "react-icons/md";
import { RiMenuFold3Line, RiMenuFold4Line } from "react-icons/ri";
import { Route, Routes, Link } from 'react-router-dom';
import AddFunction from './AddFunction';
import AddMember from '../Datatable/AddMember';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Dashboard = () => {
    const [sidebarWidth, setSidebarWidth] = useState('20%');
    const [rightSectionWidth, setRightSectionWidth] = useState('80%');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        if (isMenuOpen) {
            setSidebarWidth('20%');
            setRightSectionWidth('80%');
        } else {
            setSidebarWidth('5%');
            setRightSectionWidth('95%');
        }
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="dashboard border" style={{ width: '100%', height: '100vh', backgroundColor: 'antiquewhite', display: 'flex' }}>
            {/* Sidebar Section */}
            <div className="Sidesection" style={{ width: sidebarWidth, transition: 'width 0.5s ease-in-out', backgroundColor: '#333', color: 'white', padding: '10px' }}>
                <h3 className='text-white mt-3'>HRMS</h3>
                <div className='border'>
                    <div className='menu-item'>
                        <MdHome style={{ color: 'white' }} />
                        <Link to={'/'} style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>Dashboard</Link>
                    </div>
                    <ul style={{ listStyleType: 'none', padding: '0', marginTop: '20px' }}>
                        <li className='menu-item'>
                            <Link to={'/members'} style={{ color: 'white', textDecoration: 'none' }}>
                                Members <MdHome />
                            </Link>
                        </li>
                        <li className='menu-item'>
                            <Link to={'/Addmember'} style={{ color: 'white', textDecoration: 'none' }}>
                                Projects <MdHome />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Section */}
            <div className='right-section' style={{ width: rightSectionWidth, display: 'flex', flexDirection: 'column', transition: 'width 0.5s ease-in-out' }}>
                {/* Top Navbar */}
                <div className="top-navbar" style={{ width: '100%', height: '60px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className='d-flex gap-3 align-items-center'>
                        {isMenuOpen ? (
                            <RiMenuFold4Line onClick={handleMenuClick} size={24} />
                        ) : (
                            <RiMenuFold3Line onClick={handleMenuClick} size={24} />
                        )}
                        <div className='addFunction'>
                            <AddFunction />
                        </div>
                    </div>
                    <ul style={{ display: 'flex', gap: '30px', padding: '15px', listStyle: 'none' }} className='icons-list'>
                        <li><IoNotifications size={24} /></li>
                        <li><CiPower size={24} /></li>
                        <li><MdMessage size={24} /></li>
                        <li><MdOutlineMenu size={24} /></li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="left-section" style={{ width: '100%', height: '95vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className='mt-4' style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                        {/* Box for Total Tasks */}
                        <Paper elevation={3} style={{ width: '30%', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0f7fa' }}>
                            <h2>Total Tasks</h2>
                        </Paper>

                        {/* Box for Total Admin */}
                        <Paper elevation={3} style={{ width: '30%', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffe0b2' }}>
                            <h2>Total Admin</h2>
                        </Paper>

                        {/* Box for Total Employee */}
                        <Paper elevation={3} style={{ width: '30%', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#c8e6c9' }}>
                            <h2>Total Employee</h2>
                        </Paper>
                    </div>

                    <Routes>
                        {/* Add actual route components here */}
                        <Route path="/Addmember" element={<AddMember />} />
                        {/* Add other route components here */}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
