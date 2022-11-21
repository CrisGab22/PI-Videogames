import React from "react";

export default function Genres({genres, handleFilterByGenre}){
    let AllGenres = genres
    

    return(
        <select name="Genres" onChange={(e) => handleFilterByGenre(e)} >
            <option value='0' hidden>Genres</option>
            <option value="All" key={0}>All</option>            
            {AllGenres?.map(genre =>{
                return(
                    <option value={genre.name} key={genre.id}>{genre.name}</option>
                )
            })}
        </select>
    )

}