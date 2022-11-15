import React from "react"

export default function Alphabetically({handleFilterByAlphabetically}){

    return(
        <select name={"Alphabetically"} onChange={(e) => handleFilterByAlphabetically(e)}>
            <option value="None">None</option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
        </select>
    )

}