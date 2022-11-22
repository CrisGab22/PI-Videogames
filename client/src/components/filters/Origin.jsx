import React from "react";
import style from '../../components.css/filters.module.css' 


export default function Origin({handleFilterByOrigin}){
    return(
        <div className={style.bgColor}>
            <select className={style.filter} name='Origen' onChange={(e) => handleFilterByOrigin(e)}>
                <option value='0' hidden>Origin</option>
                <option value={'All'}>All</option>
                <option value={'Existent'}>Existent</option>
                <option value={'Created'}>Created</option>
            </select>
        </div>
    )
}