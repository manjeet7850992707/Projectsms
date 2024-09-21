import './App.css';
import Ademform from './component/Admin Dashboard/Ademform';

import Dashboard from './component/Admin Dashboard/Dashboard';
import Login from './Login page/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Home from './Home'; // Example: Add Home component

function App() {
  return (
    <>
      <BrowserRouter>
    
        
        <Routes>
          
          <Route path="/" element={<Login />} />
          
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/addemployee' element={<Ademform/>}/>
          
    
        </Routes>
      </BrowserRouter>


      
    </>
  );
}

export default App;
