import React, { useEffect, useState } from 'react';
import CustomTable from './Customtable'; // Import the reusable table
import axios from 'axios'; // Ensure axios is installed
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon
import { IconButton, Button, Box, Typography } from '@mui/material'; // Import necessary MUI components

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
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [role, setRole] = useState('employee');
    const [assignedAdmin, setAssignedAdmin] = useState('');
    const [admins, setAdmins] = useState([]); // State for admin options

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

        const fetchAdminsData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getadminsdata'); // Adjust your endpoint
                setAdmins(response.data);
            } catch (error) {
                console.error('Error fetching admins data:', error);
            }
        };

        fetchMembersData();
        fetchAdminsData();
    }, []);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newMember = { email, mobileNumber, role, assignedAdmin };
            const response = await axios.post('http://localhost:5000/addmember', newMember); // Adjust your endpoint
            setRows([...rows, { id: response.data._id, ...newMember }]); // Update the rows with the new member
            // Reset form fields
            setEmail('');
            setMobileNumber('');
            setRole('employee');
            setAssignedAdmin('');
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    return (
        <div className='d-flex flex-column gap-4'>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Add a New Member
            </Typography>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Member Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    required
                />
                <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="form-control mt-2"
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-control mt-2"
                    required
                >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>

                {role === 'employee' && (
                    <select
                        value={assignedAdmin}
                        onChange={(e) => setAssignedAdmin(e.target.value)}
                        className="form-control mt-2"
                        required
                    >
                        <option value="">Select Admin</option>
                        {admins.map(admin => (
                            <option key={admin._id} value={admin._id}>
                                {admin.email} {/* Display admin's email */}
                            </option>
                        ))}
                    </select>
                )}

                <Button type="submit" variant="contained" color="primary" className="mt-3">
                    Submit
                </Button>
            </form>

            <CustomTable
                columns={memberColumns}
                rows={rows}
                paginationModel={{ page: 0, pageSize: 5 }}
            />
        </div>
    );
};

export default AddMember;
