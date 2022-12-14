import Navbar from './Navbar';
import HomeScreen from './HomeScreen';
import {Routes, Route} from 'react-router-dom'
import Form from "./components/Form";
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
       <Route path="/" element={<HomeScreen />} />
       <Route path="/membership" element={ <Form/> } />
      </Routes>
      
    </div>
  );
}

export default App;
