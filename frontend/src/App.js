import './App.css';
import Login from './Login page/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './Home'; // Example: Add Home component

function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          
          <Route path="/login" element={<Login />} />
         
          
    
        </Routes>
      </BrowserRouter>


      
    </>
  );
}

export default App;
