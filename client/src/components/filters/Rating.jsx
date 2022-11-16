import React from "react";

export default function Rating({handleFilterByRating}){
    return(
        <select name='Rating' onChange={(e) => handleFilterByRating(e)}>
            <option value={'None'}>None</option>
            <option value={'Top-Rated'}>Top Rated</option>
            <option value={'Worst-Rated'}>Worst Rated</option>
        </select>
    )
}