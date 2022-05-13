import React, { useState } from "react";
import { Link } from "react-router-dom";
import headerLogo from '../assets/9XNFT.png';

const BackHomepage = () => {
    const [click, setClick] = useState("");

    const handleClick = () => setClick("clicked");

    return (

    <nav className="backHomepage" clicked={click}>
        <Link className="logo" onClick={handleClick} to="/" name="homepage"><img src={headerLogo} alt="logo 9XNFT" /></Link>
    </nav>   

    );
};

export default BackHomepage;