import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdHome, MdAdd } from "react-icons/md";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io"; // Import both icons
import './Dashboard.css'; // Import the CSS file

const Sidesection = ({ sidebarWidth }) => {
    const [isExpanded, setIsExpanded] = useState(false); // State to manage submenu visibility
    const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

    const handleArrowClick = () => {
        setIsExpanded(!isExpanded); // Toggle submenu visibility
    };

    const handleMouseEnter = () => {
        if (sidebarWidth === '3%') {
            setShowDropdown(true);
        }
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    return (
        <div 
            className="Sidesection border-right" 
            style={{ width: sidebarWidth, transition: 'width 0.5s ease-in-out', padding: '10px' }}
            onMouseLeave={handleMouseLeave}
        >
            <h3 className='text-dark mt-3' style={{ opacity: sidebarWidth === '3%' ? '0' : '1' }}>Kotibox</h3>
            <section className='mt-4'>
                <div className='d-flex flex-column gap-2'>
                    <div className='menu-item d-flex justify-content-between align-items-center '>
                        <div className='menu-link'>
                            <MdHome style={{ fontSize: '20px' }} className="menu-icon" />
                            <Link to={'/'} className='menu-text text-dark' style={{ display: sidebarWidth === '3%' ? 'none' : 'inline' }}>
                                Dashboard
                            </Link>
                        </div>
                        {sidebarWidth === '20%' && (
                            isExpanded ? (
                                <IoMdArrowDropdown className="menu-icon" onClick={handleArrowClick} />
                            ) : (
                                <IoMdArrowDropright className="menu-icon" onClick={handleArrowClick} />
                            )
                        )}
                    </div>

                    {isExpanded && (
                        <div className='submenu mt-2' style={{ paddingLeft: '20px' }}>
                            <div className='menu-item'>
                                <MdAdd className="menu-icon" 
                                    onMouseEnter={handleMouseEnter} 
                                    onMouseLeave={handleMouseLeave}
                                />
                                <Link to={'/Addmember'} className='menu-text' style={{ display: sidebarWidth === '3%' ? 'none' : 'inline' }}>
                                    Add Member
                                </Link>
                            </div>
                            <div className='menu-item'>
                                <MdAdd className="menu-icon" 
                                    onMouseEnter={handleMouseEnter} 
                                    onMouseLeave={handleMouseLeave}
                                />
                                <Link to={'/Addtask'} className='menu-text' style={{ display: sidebarWidth === '3%' ? 'none' : 'inline' }}>
                                    Add Task
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {showDropdown && sidebarWidth === '3%' && (
                    <div className='dropdown' style={{ position: 'absolute', left: '100%', top: '0', backgroundColor: 'white', border: '1px solid #ccc', zIndex: 1 }}>
                        <div className='dropdown-item'>
                            <MdAdd /> <Link to={'/Addmember'} className='dropdown-link'>Add Member</Link>
                        </div>
                        <div className='dropdown-item'>
                            <MdAdd /> <Link to={'/Addtask'} className='dropdown-link'>Add Task</Link>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Sidesection;
