import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [click, setClick] = useState("");

    const handleClick = () => setClick("clicked");

    return (

    <nav className="menu" clicked={click}>
        <Link className="item_menu" onClick={handleClick} to="/Create" name="create"><span>Create</span></Link>
        <Link className="item_menu" onClick={handleClick} to="/Buy" name="buy"><span>Buy</span></Link>
        <Link className="item_menu" onClick={handleClick} to="/Gallery" name="gallery"><span>Your Gallery</span></Link>
    </nav>   

    );
};

export default Navbar;