import React from 'react'
import style from '../components.css/videogame.module.css'

function Videogame({name, released, img}) {
    return(
        <div className={style.separator}>
            <div className={style.containerInd}> 
                <img src={img} alt="not found"  className={style.img}/>
                <h3>{name}</h3>
            </div>
        </div>
    )
}

export default Videogame;