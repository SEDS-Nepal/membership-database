import Navbar from './Navbar';
import HomeScreen from './HomeScreen';
import {Routes, Route} from 'react-router-dom'
import Form from "./components/Form";
import './App.css';
import Club from './components/Club';
// import Table from './components/Table';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
       <Route path="/" element={<HomeScreen />} />
       <Route path="/membership" element={ <Form/> } />
       <Route path="/club" element={ <Club/> } />
       {/* <Route path="/membersdata" element={<Table />} /> */}
      </Routes>
      
    </div>
  );
}

export default App;
