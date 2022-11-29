import React from 'react'
import { Link } from 'react-router-dom';
import style from '../components.css/nav.module.css'

function Navbar() {
    
    return(
        <div className={`${style.contenedor}`}>
                <div className={style.containerImg}>
                    <h3 className={style.title}>PI-VIDEOGAMES</h3>
                </div>
            <Link to="/home/create" className={`${style.linkAbout} ${style.links}`}>
                    <label className={style.create}>Create</label>
                    <div className={style.containerAdd}>
                        <img src="https://cdn.iconscout.com/icon/free/png-256/add-1437-439413.png" alt='create' className={style.addGame}/>
                    </div>
            </Link>
        </div>
    )
}

export default Navbar;