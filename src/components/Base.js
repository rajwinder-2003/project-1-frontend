import React from "react";
import Navbar from "./Navbar";

const Base = ({
    title = "My title",
    description = " My description",
    className= "text-white p-4",
    children
}) => (
    <div>
        <Navbar/>
        <div className="container-fluid">
            <div className="jumbotron text-white text-center">
                <h2 className="display-4 mt-5">{title}</h2>
                <p className="lead"> {description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
        <footer className="footer mb-0 mt-5 py-3">
            <div className="container-fluid bg-info text-white text-center py-3">
                <h4 className=" bg-info">If you got any question, feel free to reach out!</h4>
                <button className="btn btn-outline-dark btn-lg">Contact Us</button>
            </div>
            <div className="container">
                <span className="text-muted">
                    An Amazing place to buy <span className="text-white">T-Shirt Store</span>
                </span>
            </div>
        </footer>
    </div>
)

export default Base;