import React from "react";
import style from '../../components.css/filters.module.css' 

export default function Rating({handleFilterByRating}){
    return(
        <div className={style.bgColor}>
            <select className={style.filter} name='Rating' onChange={(e) => handleFilterByRating(e)}>
                <option value={'0'} hidden>Rating</option>
                <option value={'None'}>None</option>
                <option value={'Top-Rated'}>Top Rated</option>
                <option value={'Worst-Rated'}>Worst Rated</option>
            </select>
        </div>
    )
}