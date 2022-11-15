import React, { useState, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {filterByGenre, getAllGenres, getAllVideogames, filterByAlphabetically, filterByOrigin} from '../redux/actions'
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
    let videogames = useSelector(state => state.videogamesFiltered)
    let genres= useSelector(state => state.genres)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
    },[dispatch])
//fin react-redux


//Paginado
    //states
        const [CurrentPage, setCurrentPage] = useState(1)
    //función recorredora del paginado
        const current = (numberpage)=>{
        setCurrentPage(numberpage)
        }
    //const
        const actualPage = CurrentPage
        const videogamesRenderPerPage = 15
        const indexOfLastVideogame= CurrentPage* videogamesRenderPerPage
        const indexOfFirstVideogame= indexOfLastVideogame - videogamesRenderPerPage
        const videogamesSliced = videogames?.slice(indexOfFirstVideogame, indexOfLastVideogame) 
//fin paginado


//Filtrado
    //Genre
        //función despachadora
        function handleFilterByGenre(e) {
            const info = dispatch(filterByGenre(e.target.value))
            info?setCurrentPage(1): setCurrentPage(0)
        }
    //Alphabetically
        //función despachadora
        function handleFilterByAlphabetically(e) {
            const info = dispatch(filterByAlphabetically(e.target.value))
            info? setCurrentPage(1): setCurrentPage(0)        
        }
    //Origin
        //funcion despachadora
        function handleFilterByOrigin(e) {
            const info = dispatch(filterByOrigin(e.target.value))
            info? setCurrentPage(1): setCurrentPage(0)        
        }


return(
    <div> 

        <div className='filters'>
            <Alphabetically handleFilterByAlphabetically={handleFilterByAlphabetically}/>
            <Genres genres ={genres} handleFilterByGenre={handleFilterByGenre}/>
            <Origin handleFilterByOrigin={handleFilterByOrigin}/>
            <Rating/>
        </div>
        

            <Pages videogames={videogames} current = {current} actualPage = {actualPage}/>

        <div className={style.Containervideogames}>
            {videogamesSliced &&  videogamesSliced.map(game => {
                return <Videogame
                videogames= {videogames}
                key= {game.id}
                name={game.name}
                released={game.released}
                img={game.img}
                platforms= {game.platforms}
                />
            })}
        </div>
    </div>
)

}

