import React from "react";
import style from "../components.css/pages.module.css"

export default function Pages({videogames,current, actualPage}) {
    let pages = [] // el número de páginas de mi componente 
    
    for(let i = 1; i<=Math.ceil(videogames/15); i++){
        pages.push(i)
    }

    return(
        videogames>15?
        <div className={style.container}>
            <button className={`${style.button} ${(actualPage === 0 || actualPage === 1)? style.hiddenButton: style.buttonHover}`} onClick={() =>current(actualPage-1)}>{'<'}</button>
            <ul className={style.containerPages}>
                {pages.map(page=>{
                    if(page === actualPage){
                        return(
                            <li onClick={() => current(page)} className={`${style.page} ${style.pageActual}`} key={page} > {page} </li>
                        )
                    }
                    else return(
                        <li onClick={() => current(page)} className={style.page} key={page}> {page} </li>
                        )
                })}
            <button className={`${style.button} ${ (pages[pages.length-1] <= 1 ||actualPage === pages[pages.length-1] || videogames < 1 )? style.hiddenButton: style.buttonHover}`} onClick={() =>current(actualPage+1)}>{">"}</button>
            </ul>
        </div>
        :
        <>
        </>
    )
        
}