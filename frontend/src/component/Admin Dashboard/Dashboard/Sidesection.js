import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";

const Sidesection = ({ style }) => {
    return (
        <div className="Sidesection" style={style}>
            <h3 className='text-center text-white mt-3'>HRMS</h3>
            <ul>
                <li><Link to={'/'}> <MdHome />Dashboard </Link></li>
                <li><Link to={'/members'}>Members <MdHome /></Link></li>
                <li><Link to={'/projects'}>Projects <MdHome /></Link></li>
            </ul>
        </div>
    );
};

export default Sidesection;