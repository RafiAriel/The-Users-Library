import React, {useState} from "react";
import NavBar from './components/NavBar'
import UsersTable from './components/UsersTable'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { GlobalStyle } from "./GlobalStyle";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalEditUser from "./components/Modal";
import {UsersContext} from './utils/ObjectContext';


const App = () => {
  const [Users, setUsers] = useState(null);


  return (
    <>
    <UsersContext.Provider value={{ Users, setUsers }}>
    <Router>
    <GlobalStyle/>
    <Routes>

    <Route path='/' element={<> <NavBar/> <UsersTable/>  </>} />
    <Route path='/users/:uuid' element={<> <ModalEditUser/> </>} />

    </Routes>
    </Router>
    </UsersContext.Provider>

    </>
  );
};

export default App;
