import React, { useState } from 'react';
import './Dashboard.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios'; // Make sure to install axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
    const [role, setRole] = useState('employee'); // Default role

    const navigate = useNavigate(); // Initialize useNavigate

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // Reset form fields
        setEmail('');
        setMobileNumber('');
        setRole('employee');
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('http://localhost:5000/register', {
                email,
                mobileNumber,
                role,
            });
            alert(response.data.message); // Show success message
            handleClose(); // Close modal after successful registration
            // Navigate to /Addmember after success

            if (response.data.message === "User registered successfully") {
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

            {/* Modal for adding a member */}
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
