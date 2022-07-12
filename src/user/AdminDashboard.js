import React from 'react'
import { isAuthenticate } from '../Auth/helper';
import Base from "../components/Base";
import AdminLeftSide from './AdminLeftSide';

const AdminDashboard = () => {
    const {user: {name, email, role}} = isAuthenticate();

const adminRightSide = () => {
    return(
       <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="badge bg-info me-2">Name:</span>{name}
                </li>
                <li className="list-group-item">
                    <span className="badge bg-info me-2">Email:</span>{email}
                </li>
                <li className="list-group-item">
                    <span className="badge bg-info me-2">Role:</span>{role}
                </li>
                <li className="list-group-item">
                    <span className="badge bg-danger">Admin Area</span>
                </li>
            </ul>
       </div>
    )
};

  return (
        
        <Base 
            title='Welcome to admin area' 
            description='Manage all of your products here'
            className=' container bg-info p-4'
        >
            <div className="row">
                <div className="col-3">
                    <AdminLeftSide/>
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div> 
        </Base>
    )
}

export default AdminDashboard;