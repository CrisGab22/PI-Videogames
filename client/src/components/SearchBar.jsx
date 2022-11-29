import React, { useState } from "react";
import style from '../components.css/searchBar.module.css'
import {useDispatch} from 'react-redux'
import {getAllVideogamesName} from '../redux/actions.js'

function SearchBar() {

    const dispatch = useDispatch()

    function handleSearch(e){
        dispatch(getAllVideogamesName(e.target.value))
        e.preventDefault()
        setSearched(e.target.value)
        // handler(e.target.value)
    }
    // eslint-disable-next-line
    const[searched, setSearched] = useState('')


    return(
            <form  onSubmit={(e)=>e.preventDefault()} className={style.container}>
                <input type="text"  className={`${style.searchBar}`} onChange={(e) =>handleSearch(e)} />
                <input type={'submit'} className={style.img} value=''></input>
            </form>

    )
}

export default SearchBar;