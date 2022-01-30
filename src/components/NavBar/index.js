import React from "react";
import { Navbar} from "react-bootstrap";
import {Bar, Logo} from './NavBar.styles';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button'

const NavBar = () => {
	
	let navigate = useNavigate();

	return (
		<>
		<Bar>
		<Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>
		<Logo><span>The Users Library</span></Logo>
	    </Navbar.Brand>
	   <Button variant="secondary" onClick={()=> navigate('users/add')}>Add New User</Button>{' '}
	  </Navbar>
	  </Bar>
	  </>
	);
};

export default NavBar;
