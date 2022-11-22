import React from "react";
import style from '../../components.css/filters.module.css' 

export default function Genres({genres, handleFilterByGenre}){
    let AllGenres = genres
    

    return(
        <div className={style.bgColor}>

            <select className={style.filter} name="Genres" onChange={(e) => handleFilterByGenre(e)} >
                <option value='0' hidden>Genres</option>
                <option value="All" key={0}>All</option>            
                {AllGenres?.map(genre =>{
                    return(
                        <option value={genre.name} key={genre.id}>{genre.name}</option>
                        )
                    })}
            </select>
        </div>
    )

}