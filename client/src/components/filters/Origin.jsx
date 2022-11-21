import React from "react";

export default function Origin({handleFilterByOrigin}){
    return(
        <select name='Origen' onChange={(e) => handleFilterByOrigin(e)}>
            <option value='0' hidden>Origin</option>
            <option value={'All'}>All</option>
            <option value={'Existent'}>Existent</option>
            <option value={'Created'}>Created</option>
        </select>
    )
}