import React, { useState } from "react";
import style from '../components.css/searchBar.module.css'
import {useDispatch} from 'react-redux'
import {getAllVideogamesName} from '../redux/actions.js'

function SearchBar() {

    const dispatch = useDispatch()

    function handleSearch(e){
        e.preventDefault()
        setSearched(e.target.value)
        dispatch(getAllVideogamesName(e.target.value))
    }
    const[searched, setSearched] = useState('')


    return(
        <div>
            <form  onSubmit={(e)=>e.preventDefault()}>
                <input type="text"  className={`${style.searchBar}`} onChange={(e) =>handleSearch(e)} value={searched} />
            </form>

        </div>
    )
}

export default SearchBar;