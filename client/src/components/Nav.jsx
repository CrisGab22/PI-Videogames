import React from 'react'
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import style from '../components.css/nav.module.css'

function Navbar() {
    
    return(
        <div className={`${style.contenedor}`}>
            <Link to="/home" className={`${style.linkHome} ${style.links}`}>
                <div className={style.containerImg}>
                    <img src="https://www.svgrepo.com/show/35381/white-home.svg" alt="home" className={style.img}/>
                </div>
            </Link>
                <SearchBar  />
            <Link to="/home/create" className={`${style.linkAbout} ${style.links}`}>
                    <label>Create</label>
                    <div className={style.containerAdd}>
                        <img src="https://cdn.iconscout.com/icon/free/png-256/add-1437-439413.png" alt='create' className={style.addGame}/>
                    </div>
            </Link>
        </div>
    )
}

export default Navbar;