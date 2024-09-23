import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddFunction = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [role, setRole] = useState('employee');
    const [admins, setAdmins] = useState([]); // State to store the list of admins
    const [assignedAdmin, setAssignedAdmin] = useState(''); // Store selected admin

    const navigate = useNavigate();

    // Fetch all admins when the modal opens
    useEffect(() => {
        if (role === 'employee') {
            axios.get('http://localhost:5000/getAllAdmins')
                .then(response => {
                    setAdmins(response.data); // Set the admin list
                })
                .catch(error => {
                    alert('Failed to load admins');
                });
        }
    }, [role]); // Fetch admins when the role is employee

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEmail('');
        setMobileNumber('');
        setRole('employee');
        setAssignedAdmin('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/register', {
                email,
                mobileNumber,
                role,
                assignedAdmin: role === 'employee' ? assignedAdmin : undefined,
            });
            alert(response.data.message);
            handleClose();

            if (response.data.message === 'User registered successfully') {
                navigate('/Addmember');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <>
            <Button onClick={handleOpen}>+ Add Member</Button>
            <Button>+ Add Task</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="add-member-modal-title"
                aria-describedby="add-member-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="add-member-modal-title" variant="h6" component="h2">
                        Add a New Member
                    </Typography>
                    <Typography id="add-member-modal-description" sx={{ mt: 2 }}>
                        Please fill in the details to add a new member.
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

                        {/* Show admin dropdown only if the role is 'employee' */}
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
                </Box>
            </Modal>
        </>
    );
};

export default AddFunction;
