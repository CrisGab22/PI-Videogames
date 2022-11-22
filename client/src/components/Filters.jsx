import React, { useState } from "react";
import { useSelector } from "react-redux";
import Alphabetically from "./filters/Alphabetically";
import Genres from "./filters/Genres";
import Origin from "./filters/Origin";
import Rating from "./filters/Rating";
import style from '../components.css/filters.module.css' 

export default function Filters({rerender}){
    let genres= useSelector(state => state.genres)



    const [filters,setFilters] = useState({
        genres:'All',
        origin:'All',
        alphabetically:'none',
        rating:'none',
    }) 
   

    function handleFilterByGenre(e){
        e.preventDefault()
        setFilters({
            ...filters,
            genres: e.target.value
        })
        rerender({ ...filters,genres: e.target.value})
    }

    function handleFilterByOrigin(e){
        e.preventDefault()
        setFilters({
            ...filters,
            origin: e.target.value
        })
        rerender({...filters, origin:e.target.value})
    }

    function handleFilterByAlphabetically(e){
        e.preventDefault()
        setFilters({
            ...filters,
            alphabetically: e.target.value
        })
        rerender({...filters, alphabetically: e.target.value})
    }

    function handleFilterByRating(e){
        e.preventDefault()
        setFilters({
            ...filters,
            rating: e.target.value
        })
        rerender({...filters, rating: e.target.value})
    }


    return(
        <div className={style.container}>
            <Genres genres ={genres} handleFilterByGenre={handleFilterByGenre}/>
            <Origin handleFilterByOrigin={handleFilterByOrigin}/>
            <Rating handleFilterByRating={handleFilterByRating}/>
            <Alphabetically handleFilterByAlphabetically={handleFilterByAlphabetically}/>
        </div>
    )
}
