import React from 'react'
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import style from '../components.css/nav.module.css'

function Navbar() {
    return(
        <div className={`${style.contenedor}`}>
            <Link to="/home" className={`${style.linkHome} ${style.links}`}>Home</Link>
            <SearchBar/>
            <Link to="/home/about" className={`${style.linkAbout} ${style.links}`}>About me</Link>
        </div>
    )
}

export default Navbar;