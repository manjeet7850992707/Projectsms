import './App.css';
import Navbar from './component/Navbar/Navbar';
import Login from './Login page/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Home from './Home'; // Example: Add Home component

function App() {
  return (
    <>
      <BrowserRouter>
    
        
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={<Navbar/>}/>
          
          
          
    
        </Routes>
      </BrowserRouter>


      
    </>
  );
}

export default App;
