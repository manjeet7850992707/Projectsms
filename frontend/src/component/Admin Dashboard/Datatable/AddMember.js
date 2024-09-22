import React, { useEffect, useState } from 'react';
import CustomTable from './Customtable'; // Import the reusable table
import axios from 'axios'; // Ensure axios is installed
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon
import { IconButton } from '@mui/material'; // Import IconButton

const memberColumns = [
    { field: 'employeeId', headerName: 'Employee ID', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
    { field: 'role', headerName: 'Role', width: 100 },
    {
        field: 'action',
        headerName: 'Action',
        width: 200,
        renderCell: (params) => (
            <>
                <IconButton >
                    <EditIcon />
                </IconButton>
                <IconButton >
                    <DeleteIcon />
                </IconButton>
            </>
        ),
    },
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

    const handleEdit = (id) => {
        // Add your edit logic here
        console.log('Edit member with ID:', id);
    };

    const handleDelete = async (id) => {
        // Confirm deletion (optional)
        if (window.confirm('Are you sure you want to delete this member?')) {
            try {
                await axios.delete(`http://localhost:5000/members/${id}`); // Adjust your endpoint
                setRows(rows.filter(row => row.id !== id)); // Remove the deleted member from state
            } catch (error) {
                console.error('Error deleting member:', error);
            }
        }
    };

    return (
        <CustomTable
            columns={memberColumns}
            rows={rows}
            paginationModel={{ page: 0, pageSize: 5 }}
        />
    );
};

export default AddMember;
