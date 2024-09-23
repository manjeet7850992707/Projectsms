import React from 'react';
import Paper from '@mui/material/Paper';

const DashboardFunction = () => {
    return (
        <div className='mt-4 p-3' style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            {/* Box for Total Tasks */}
            <Paper elevation={3} style={{ width: '30%', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0f7fa' }}>
                <h2>Total Tasks</h2>
            </Paper>

            {/* Box for Total Admin */}
            <Paper elevation={3} style={{ width: '30%', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffe0b2' }}>
                <h2>Total Admin</h2>
            </Paper>

            {/* Box for Total Employee */}
            <Paper elevation={3} style={{ width: '30%', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#c8e6c9' }}>
                <h2>Total Employee</h2>
            </Paper>
        </div>
    );
};

export default DashboardFunction;
