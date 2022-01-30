import React, {useEffect, useContext} from "react";
import { CustomWrapper } from './UsersTable.styls';
import { useAlert } from 'react-alert';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate } from 'react-router';
import {UsersContext} from '../../utils/ObjectContext';


const UsersTable = () =>
{
    let navigate = useNavigate();
    const alert = useAlert();
    const { Users, setUsers } = useContext(UsersContext);
    console.log(Users);

    const FetchData = () =>
    {
        useEffect(() => {
            const fetchUsers = async () => {
            const data = await axios.get("https://randomuser.me/api/?results=10");
            setUsers(data["data"]["results"]);
            }
            if (Users == null) fetchUsers();
    
        }, []);
    }

    const deleteUser = (e) => 
    {
        let uuid = e.target.getAttribute('uuid');
        console.log(Users);
        console.log(uuid);
        let temp = Users;

        temp = temp.filter(function (user) {
          return user["login"]["uuid"] != uuid;
      });

      setUsers(temp)
      alert.success("The User has been deleted!");


    }
    FetchData();

    return (
        <>
        <CustomWrapper> 
            <h1>All Users</h1> <br/>         
        <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User image</th>
            <th>Location</th>
            <th>ID</th>
            <th>Actions</th>
            </tr> 
        </thead>
        <tbody>
        {
            Users != null ? (
            Users.map((user) => {
                return (
                <>
                <tr>
                    <td> {user["name"]["title"] + ' ' + user["name"]["first"] + ' ' + user["name"]["last"] }  </td>
                    <td> {user["email"]} </td>
                    <td> {(user["picture"]["medium"]) ? <img src={user["picture"]["medium"]} alt=''/> : <div> No Image </div> } </td>
                    <td> {user["location"]["country"] + ', ' + user["location"]["city"]
                    + user["location"]["street"]["name"] + ' ' + user["location"]["street"]["number"]
                    }
                    </td>
                    <td> {user["login"]["uuid"] } </td>
                    <td> <Button variant="danger" onClick={deleteUser} uuid={user["login"]["uuid"]}>Delete</Button>
                         <Button variant="primary" onClick={()=> navigate('/users/' + user["login"]["uuid"])}>Edit</Button>{' '} 
                    </td>
                </tr>
                </>
                )
            })) : null
        }
        </tbody>
        </table>

        </CustomWrapper>
        </>
    )
}

export default UsersTable;
