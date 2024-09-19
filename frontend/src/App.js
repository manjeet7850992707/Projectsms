import './App.css';
import SuperAdmin from './component/Admin Dashboard/SuperAdmin';
import Login from './Login page/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './Home'; // Example: Add Home component

function App() {
  return (
    <>
      <BrowserRouter>
      <SuperAdmin/>
        
        <Routes>
          
          <Route path="/login" element={<Login />} />
          
          
    
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
