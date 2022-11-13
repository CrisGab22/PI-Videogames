import React from "react";
import {Link} from 'react-router-dom'

export default function Landing () {
    return(
        <div>
            <h1>Welcome foreign</h1>
            <Link to={'/home'}>Ingresar</Link>
        </div>
    )
}