import React from "react"
import style from '../../components.css/filters.module.css' 


export default function Alphabetically({handleFilterByAlphabetically}){

    return(
        <div className={style.bgColor}>
            <select className={style.filter} name={"Alphabetically"} onChange={(e) => handleFilterByAlphabetically(e)}>
                <option value='0' hidden>Alphabetically</option>
                <option value="None">None</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>
        </div>
    )

}