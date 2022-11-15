import React from "react";

export default function Rating(){
    return(
        <select name='Rating'>
            <option value={'Top-Rated'}>Top Rated</option>
            <option value={'Worst-Rated'}>Worst Rated</option>
        </select>
    )
}