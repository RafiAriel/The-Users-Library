import Modal from 'react-bootstrap/Modal'
import React, {useState, useContext} from "react";
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import {UsersContext} from '../../utils/ObjectContext';

const ModalEditUser = () =>
{
    const { uuid } = useParams(); // uuid uniqe of user 
    const { register, handleSubmit, formState: {errors} } = useForm();
    const alert = useAlert();
    let navigate = useNavigate();
    const [show, setShow] = useState(true);
    const { Users, setUsers } = useContext(UsersContext);

    // check if email already exists
    function isEmailExists(email)
    { 
      let flag = 0;
      Users.forEach(user => {
        if((user['email'].toUpperCase()) == email.toUpperCase())
        {
          flag = -1;
        }
      });
      return flag;
      
    }

    const onSubmit = (data) => 
    {
      // if email already exists, Exit the function
      console.log((isEmailExists(data["Email"])))
      if(isEmailExists(data["Email"]) == -1)
      {
        alert.error("The email already exists");
        Finish();
        return;
      } 

      // change details of user 
      const accessUser = (user) =>
      {
        let Name = data["Name"].split(" ");
        user["name"]["first"] = Name[0];
        user["name"]["last"] = Name[1];
        user["email"] = data["Email"];
        user["location"]["country"] = data["Country"];
        user["location"]["city"] = data["City"];
        user["location"]["street"]["name"] = data["Street"];
        user["location"]["street"]["number"] = data["StreetNumber"];
        return user;
      }

      /*
      Make Flag:
      if uuid != 'add' : Edit User, otherwise : Create New User
      */
     if (uuid != 'add')
     {
      Users.forEach(user => {
        if(user["login"]["uuid"] == uuid)
        {
          accessUser(user);
          Success();
          return;

        }
      });
     }
     else
     {
       // Add New User: Take random user and copy & change it
      var newUser = JSON.parse(JSON.stringify(Users[0]));
      newUser = accessUser(newUser);
      newUser["login"]["uuid"] = Math.floor(Math.random() * 100000);
      newUser["picture"]["medium"] = null;
      Users.push(newUser);
      setUsers(Users);
      Success();
     }
    }

    const Finish = () =>
    { 
      setShow(false);
      navigate('/')
    }

    const Cancel = () =>
    {
      Finish();
      alert.show("No change was made");
    }

    const Success = () =>
    {
      Finish();
      alert.success("Successfully done!");
    }
  
    return (
      <>
        <Modal
          show={show}
          onHide={Cancel}
          backdrop="static"
          keyboard={false}
          size = 'lg'
        >
          <Modal.Header closeButton>
            {uuid == 'add' ? 
            (<h4>Create New User</h4>) : <h4>Edit User</h4>}
          </Modal.Header>
          <Modal.Body>
          
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Control placeholder="Enter new Full Name" {...register("Name", { required: "Name field is required", 
              minLength: { value: 3, message: "Min length is 3" }})} />
            </Form.Group>
            <p>{errors.Name?.message}</p>
            <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Enter new name@example.com" {...register("Email", { required: "Email field is required"})} />
            </Form.Group>
            <p>{errors.Email?.message}</p>

            <Form.Group className="mb-3">
                <Form.Control placeholder="Enter new Country" {...register("Country", { required: "Country field is required"})} />
            </Form.Group>
            <p>{errors.Country?.message}</p>

            <Form.Group className="mb-3">
                <Form.Control placeholder="Enter new City" {...register("City", { required: "City field is required"})} />
            </Form.Group>
            <p>{errors.City?.message}</p>
            
            <Form.Group className="mb-3">
                <Form.Control placeholder="Enter new Street" {...register("Street", { required: "Street field is required"})} />
            </Form.Group>
            <p>{errors.Street?.message}</p>

            <Form.Group className="mb-3">
                <Form.Control placeholder="Enter new Street Number" {...register("StreetNumber", { required: "Number Street field is required"})} />
            </Form.Group>
            <p>{errors.StreetNumber?.message}</p>


            <input type="submit" value="Save"/> &nbsp; 
            <input type="submit" onClick={Cancel} value="Cancel"/>
      
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  export default ModalEditUser;
