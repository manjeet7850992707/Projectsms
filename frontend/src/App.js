import './App.css';
import Dashboard from './component/Admin Dashboard/Dashboard/Dashboard';
import { Logincontext } from './component/context/Logincontext';
import Login from './Login page/Login';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [Superadminlogin, setSuperadminlogin] = useState(localStorage.getItem('Superadminlogin'));

  return (
    <Logincontext.Provider value={{Superadminlogin ,setSuperadminlogin}}>
      {Superadminlogin && <Dashboard/>}
      <Routes>
        <Route path="/asd" element={<Login />} />
        
      </Routes>
      </Logincontext.Provider>
    
  );
}

export default App;
