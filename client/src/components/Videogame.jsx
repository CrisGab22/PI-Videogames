import React from 'react'
import style from '../components.css/videogame.module.css'

function Videogame({name, img, platforms}) {


    return(
        <div className={style.separator}>
            <div className={style.containerInd}> 
                <img srcSet={`${img}, https://img.freepik.com/vector-gratis/advertencia-red-internet-404-error-pagina-o-archivo-no-encontrado-pagina-web-pagina-error-internet-o-problema-no-encontrado-red-error-404-presente-hombre-durmiendo-pantalla_1150-55450.jpg?w=2000`} alt="not found"  className={style.img}/>
                <h3 className={style.nameVideogame}>{name}</h3>
                <div className={style.platformsContainer}>
                    <h3 className={style.platformsTitle}>Available In:</h3>
                    <div className={style.platformsChilds}>
                        {platforms.length<=7?
                            platforms.map(platform =>{
                                return(
                                    <p className={style.platformsChild} key={platform[1]}>{platform[0]}</p>  // la posición 0 representa el nombre de la plataforma, y la posición 1 el id de la plataforma (todo este embole para que no me salte el error de keys por childs)
                                    )
                                })
                            :
                            platforms.slice(0,7).map(platform =>{
                                return(
                                    <p className={style.platformsChild} key={platform[1]}>{platform[0]}</p>  // la posición 0 representa el nombre de la plataforma, y la posición 1 el id de la plataforma (todo este embole para que no me salte el error de keys por childs)

                                    )
                                })
                            }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videogame;