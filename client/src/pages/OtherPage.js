import React from "react";
import  { Link } from "react-router-dom"

export default () => {
    return (
        <div>
            Hello,
            I am some other page
            <Link to={"/"}>Home page</Link>
        </div>
    )
}