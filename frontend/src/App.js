import './App.css';
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
          
          
          
    
        </Routes>
      </BrowserRouter>


      
    </>
  );
}

export default App;
