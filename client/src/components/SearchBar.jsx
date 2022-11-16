import React from "react";
import style from '../components.css/searchBar.module.css'

function SearchBar() {
    return(
        <div>
            <form >
                <input type="text"  className={`${style.searchBar}`}/>
            </form>

        </div>
    )
}

export default SearchBar;