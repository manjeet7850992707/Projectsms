import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        // Apply theme styles to the body
        document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff'; // Set body background color
        document.body.style.color = isDarkMode ? '#fff' : '#000'; // Set body text color

        // Optionally, apply additional styles or classes
        document.body.style.transition = 'background-color 0.3s, color 0.3s'; // Smooth transition

        // Cleanup function to reset styles when component unmounts or theme changes
        return () => {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            document.body.style.transition = '';
        };
    }, [isDarkMode]); // Dependency array includes isDarkMode to re-run effect when theme changes

    const buttonStyle = {
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
        border: '2px solid',
        borderColor: isDarkMode ? '#444' : '#ccc',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '5px',
        transition: 'background-color 0.3s, color 0.3s',
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className='border-dark w-100 border border-secondary d-flex justify-content-between'>
                        <h3>Dashboard</h3>
                        <div>
                            <button style={buttonStyle} onClick={toggleTheme}>
                                {isDarkMode ? 'Light ' : 'Dark'}
                            </button>
                            <img
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                src="https://images.pexels.com/photos/28172953/pexels-photo-28172953/free-photo-of-a-woman-with-a-scarf-on-her-head-in-a-wheat-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                alt="User"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div style={{ height: '92vh' }} className="col-lg-2 border-end border-secondary">
                            hello
                        </div>
                        <div className="col-lg-10">
                            <button className='btn btn-primary'>Add Admin</button>
                            <button className='btn btn-primary'>Add Employee</button>
                            <button className='btn btn-primary'>Add Project</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
