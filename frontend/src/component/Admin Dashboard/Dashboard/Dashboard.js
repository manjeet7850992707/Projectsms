import React, { useState } from 'react';
import './Dashboard.css';
import { IoNotifications } from "react-icons/io5";
import { CiPower } from "react-icons/ci";
import { MdMessage, MdOutlineMenu } from "react-icons/md";
import { RiMenuFold3Line, RiMenuFold4Line } from "react-icons/ri";
import AddFunction from './AddFunction';
import Sidesection from './Sidesection'; // Import Sidesection component
import DashboardFunction from './DashboardFunction'; // Import the new DashboardFunction component
import { Route, Routes } from 'react-router-dom';
import AddMember from '../Datatable/AddMember'; // Import AddMember for routing

const Dashboard = () => {
    const [sidebarWidth, setSidebarWidth] = useState('20%');
    const [rightSectionWidth, setRightSectionWidth] = useState('80%');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        if (isMenuOpen) {
            setSidebarWidth('20%');
            setRightSectionWidth('80%');
        } else {
            setSidebarWidth('3%');
            setRightSectionWidth('97%');
        }
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="dashboard border" style={{ width: '100%', height: '100vh', backgroundColor: 'antiquewhite', display: 'flex' }}>
            {/* Sidebar Section */}
            <Sidesection sidebarWidth={sidebarWidth} handleMenuClick={handleMenuClick} isMenuOpen={isMenuOpen} />

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

                {/* Main Content Area - Replace the left-section with DashboardFunction */}
                <div className="left-section p-3" style={{ width: '100%', height: '95vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* DashboardFunction Component */}
                    
                    
                    {/* Routing for AddMember */}
                    <Routes>
                        <Route path="/Addmember" element={<AddMember />} />
                        <Route path='/dashboard' element={<DashboardFunction/>}/>
                        {/* Add other route components here */}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
