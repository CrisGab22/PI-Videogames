import React, { useState, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {filterByGenre, getAllGenres, getAllVideogames, filterByAlphabetically, filterByOrigin, filterByRating} from '../redux/actions'
import style from '../components.css/home.module.css'


//Importación de Componentes
import Pages from './Pages.jsx';
import Genres from './filters/Genres.jsx';
import Videogame from './Videogame.jsx';
import Alphabetically from './filters/Alphabetically.jsx';
import Origin from './filters/Origin.jsx';
import Rating from './filters/Rating.jsx';




export default function Videogames () {

    
//react-redux
    let videogames = useSelector(state => state.videogamesRender)
    let genres= useSelector(state => state.genres)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
        
    },[dispatch])
//fin react-redux


//Paginado
    //states
        const [actualPage, setActualPage] = useState(1)
        const [renderControl, setRenderControl] = useState('')
        const[videogamesPerPage, setVideogamesPerPage] = useState(15)
    //función recorredora del paginado
        const current = (numberpage)=>{
            setActualPage(numberpage)
        }
    //const
        const indexOfLastVideogame= actualPage* videogamesPerPage
        const indexOfFirstVideogame= indexOfLastVideogame - videogamesPerPage
        const videogamesSliced = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame) 
//fin paginado


//Filtrado
    //Genre
        //función despachadora
        function handleFilterByGenre(e) {
            dispatch(filterByGenre(e.target.value))
            setActualPage(1)
            setVideogamesPerPage(15)
            setRenderControl(`ordenado por Genre ${e.target.value}`)
        }
    //Alphabetically
        //función despachadora
        function handleFilterByAlphabetically(e) {
            dispatch(filterByAlphabetically(e.target.value))
            setActualPage(1)
            setRenderControl(`ordenado por alphabetically ${e.target.value}`)

        }
    //Origin
        //funcion despachadora
        function handleFilterByOrigin(e) {
            dispatch(filterByOrigin(e.target.value)) 
            setActualPage(1)
            setRenderControl(`ordenado por origin ${e.target.value}`)
        }
     //Rating
        //funcion despachadora
        function handleFilterByRating(e) {
            dispatch(filterByRating(e.target.value)) 
            setActualPage(1)
            setRenderControl(`ordenado por rating ${e.target.value}`)
        }  


return(
    <div> 
        <div className={style.filters}>
            <Genres genres ={genres} handleFilterByGenre={handleFilterByGenre}/>
            <Origin handleFilterByOrigin={handleFilterByOrigin}/>
            <Rating handleFilterByRating={handleFilterByRating}/>
            <Alphabetically handleFilterByAlphabetically={handleFilterByAlphabetically}/>
        </div>
        

            <Pages  current ={current} actualPage = {actualPage} videogames={videogames.length}/>

        <div className={style.Containervideogames}>
            {videogamesSliced &&  videogamesSliced.map(game => {
                return <Videogame
                videogames= {videogames}
                key= {game.id}
                name={game.name}
                localGenres ={game.localGenres}
                img={game.img}
                platforms= {game.platforms}
                />
            })}
        </div>
    </div>
)

}

