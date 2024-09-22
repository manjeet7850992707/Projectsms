import React, { useState } from 'react';
import './Dashboard.css';
import { IoNotifications } from "react-icons/io5";
import { CiPower } from "react-icons/ci";
import { MdMessage } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { RiMenuFold3Line } from "react-icons/ri";
import { RiMenuFold4Line } from "react-icons/ri";
import { Route, Routes } from 'react-router-dom';
import Sidesection from './Sidesection';

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
        <div className="dashboard border" style={{ width: '100%', height: '100vh', backgroundColor: 'antiquewhite', position: 'relative', display: 'flex' }}>
            <Sidesection style={{ width: sidebarWidth, transition: 'width 0.5s ease-in-out' }} />
            <div className='right-section' style={{ width: rightSectionWidth, display: 'flex', flexDirection: 'column', position: 'relative', transition: 'width 0.5s ease-in-out' }}>
                <div className="top-navbar" style={{ width: '100%', height: '60px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className='d-flex gap-3 align-items-center'>
                        {isMenuOpen ? (
                            <RiMenuFold4Line onClick={handleMenuClick} size={24} />
                        ) : (
                            <RiMenuFold3Line onClick={handleMenuClick} size={24} />
                        )}
                        <form style={{ width: '200px' }} className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>

                    <ul style={{ display: 'flex', gap: '30px', padding: '15px', listStyle: 'none' }} className='icons-list'>
                        <li><IoNotifications size={24} /></li>
                        <li><CiPower size={24} /></li>
                        <li><MdMessage size={24} /></li>
                        <li><MdOutlineMenu size={24} /></li>
                    </ul>
                </div>

                <div className="left-section" style={{ width: '100%', height: '95vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className='d-flex mt-4 gap-4'>
                        <div className="add-buttons">
                            <button type="button" className="btn border btn-sm ps-3">Add Member</button>
                            <button type="button" className="btn border btn-sm">Add Project</button>
                        </div>

                        <Routes>
                            {/* Add actual route components here */}
                            <Route path="/" element={<div>Dashboard Home</div>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
