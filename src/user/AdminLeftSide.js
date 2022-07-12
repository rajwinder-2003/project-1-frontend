import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const AdminLeftSide = () => {

    const location = useLocation();
    const currentTab = (path) => {
        if(location.pathname === path){
            return {color: "576F72"}
        } else {
            return {color: "0dcaf0"}
        }
    }

    return(
        <div className="card">
            <h4 className="text-white card-header bg-dark">Admin Navigation</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link style={currentTab("/admin/create/category")} to="/admin/create/category"className='nav-link'>
                         Create Categories
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link style={currentTab("/admin/categories")} to="/admin/categories"className='nav-link'>
                         Manage Categories
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link style={currentTab("/admin/create/product")}  to="/admin/create/product"className='nav-link'>
                         Create Product
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link style={currentTab("/admin/products")} to="/admin/products"className='nav-link'>
                         Manage Products
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link style={currentTab("/admin/orders")} to="/admin/orders"className='nav-link'>
                         Manage Orders
                    </Link>
                </li>
                
            </ul>
        </div>
    )
};

export default AdminLeftSide;