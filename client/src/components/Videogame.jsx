import React from 'react'
import style from '../components.css/videogame.module.css'

function Videogame({name, localGenres, img, platforms}) {


    return(
        <div className={style.separator}>
            <div className={style.containerInd}> 
                <img src={img} alt="not found"  className={style.img}/>
                <h3>{name}</h3>
                <ul className={style.platforms}>
                    {platforms.map(platform =>{
                        return(
                            <li className={style.platform} key={platform[1]}>{platform[0]}</li>  // la posición 0 representa el nombre de la plataforma, y la posición 1 el id de la plataforma (todo este embole para que no me salte el error de keys por childs)
                        )
                    })}
                </ul>
                {/* <ul className={style.platforms}>
                    {localGenres.map(genre =>{
                        return(
                            <li className={style.platform}>{genre}</li>  // la posición 0 representa el nombre de la plataforma, y la posición 1 el id de la plataforma (todo este embole para que no me salte el error de keys por childs)
                        )
                    })}
                </ul> */}
            </div>
        </div>
    )
}

export default Videogame;