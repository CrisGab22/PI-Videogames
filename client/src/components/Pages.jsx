import React from "react";
import style from "../components.css/pages.module.css"

export default function Pages({videogames,current, actualPage}) {
    let pages = [] // el número de páginas de mi componente 
    let numberLastPage = Math.ceil(videogames.length/15)
    for(let i = 1; i<=numberLastPage; i++){
        pages.push(i)
    }
    console.log(videogames.length)
    return(
        <div className={style.container}>
            <button onClick={() => current(actualPage-1)} disabled={(actualPage===1 ||videogames.length <1)?true:false} className={style.button}>Prev</button>
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
            </ul>
            <button onClick={() => current(actualPage+1)} disabled={(actualPage===numberLastPage || videogames.length===0)?true:false} className={style.button}>Next</button>
        </div>
    )
        
}