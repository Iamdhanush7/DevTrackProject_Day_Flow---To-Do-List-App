
import './App.css';
import Navbar from './Components/NavBar/Navbar';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import TTT from './Pages/ttTab';
import Work from './Pages/WorTab';
import Personal from './Pages/PerTab';


function App() {
  return (
    <div >
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/Timetable' element={<TTT/>}/>
        <Route path='/Work' element={<Work/>}/>
        <Route path='/Personal' element={<Personal/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
