import React from 'react';
import './Admin.css'; // Custom CSS for styles
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Import a logout icon

const Dashboard = () => {
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
            <div className="container logo-container mt-5">
                <div className='heading'>
                    <img src="https://img.icons8.com/?size=48&id=102551&format=png" alt="Logo" />
                    <h3>Dashboard</h3>
                </div>
            </div>
            <div className="container">
                <Link to="/addemployee"  className="box employee">
                    <h3>Add Employee</h3>
                </Link>
                <Link to="/addadmin" className="box admin">
                    <h3>Add Admin</h3>
                </Link>
                <Link to="/showdetails" className="box details">
                    <h3>Show Details</h3>
                </Link>
            </div>
            <div className="container mt-5" style={{backgroundColor:" rgba(0, 123, 255, 0.3);"}}>
    <div className="row">
        <div className="col-6 mt-5 ">
            <img src="https://www.slideteam.net/media/catalog/product/cache/1280x720/c/u/customer_relationship_management_process_and_dashboard_powerpoin_Slide22.jpg" alt="" className="img-fluid mb-2" />
        </div>
        <div className="col-6 mt-5">
            <img src="https://www.slideteam.net/media/catalog/product/cache/1280x720/c/u/customer_relationship_management_model_powerpoint_presentation_s_Slide25.jpg" alt="" className="img-fluid mb-2" />
        </div>
        <div className="col-6 mt-5 ">
            <img src="https://www.slideteam.net/media/catalog/product/cache/1280x720/c/u/customer_relationship_management_model_powerpoint_presentation_s_Slide35.jpg" alt="" className="img-fluid mb-2" />
        </div>
        <div className="col-6 mt-5 ">
            <img src="https://www.slideteam.net/media/catalog/product/cache/1280x720/c/u/customer_relationship_management_model_powerpoint_presentation_s_Slide22.jpg" alt="" className="img-fluid mb-2" />
        </div>
    </div>
</div>



        </>
    );
};

export default Dashboard;
