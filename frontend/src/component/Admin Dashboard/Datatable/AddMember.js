import React, { useEffect, useState } from 'react';
import CustomTable from './Customtable'; // Import the reusable table
import axios from 'axios'; // Ensure axios is installed

const memberColumns = [
    { field: 'employeeId', headerName: 'Employee ID', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
    { field: 'role', headerName: 'Role', width: 100 },
];

const AddMember = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchMembersData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getmembersdata');
                const formattedData = response.data.map(member => ({
                    id: member._id, // Use _id as id
                    employeeId: member.employeeId,
                    email: member.email,
                    mobileNumber: member.mobileNumber,
                    role: member.role,
                }));
                setRows(formattedData);
            } catch (error) {
                console.error('Error fetching members data:', error);
            }
        };

        fetchMembersData();
    }, []); // Empty dependency array to run once on mount

    return (
        <CustomTable
            columns={memberColumns}
            rows={rows}
            paginationModel={{ page: 0, pageSize: 5 }}
        />
    );
};

export default AddMember;
