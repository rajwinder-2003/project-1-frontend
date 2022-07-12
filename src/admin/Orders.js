import React from 'react'
import Base from '../components/Base';
import AdminLeftSide from '../user/AdminLeftSide';

const Orders = () => {
    
    const myCategoryForm = () => {
        return(
            <form>
            <div className="form-group">
                <p className="lead text-white">Product Orders</p>
            </div>
            </form>
        )
    };


        
      return (
            
            <Base 
            title='Orders here' 
            description='Manage the orders'
            className='bg-info container p-4'
            >
                <div className="row">
                    <div className="col-3">
                        <AdminLeftSide/>
                    </div>
                    <div className="col-9">
                        {myCategoryForm()}
                    </div>
                </div> 
            </Base>
        )
};

export default Orders;