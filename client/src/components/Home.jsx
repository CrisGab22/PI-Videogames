import React, { useState, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllGenres, getAllVideogames, filters} from '../redux/actions'
import style from '../components.css/home.module.css'
import {Link} from 'react-router-dom'


//Importación de Componentes
import Pages from './Pages.jsx';
import Videogame from './Videogame.jsx';
import Filters from './Filters'
import Navbar from './Nav'




export default function Videogames () {

    
//react-redux
    let videogames = useSelector(state => state.videogamesRender)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
    },[dispatch])
//fin react-redux
//Paginado
    //states
        const [actualPage, setActualPage] = useState(1)
        // eslint-disable-next-line
        const [renderControl, setRenderControl] = useState('')
        // eslint-disable-next-line
        const[videogamesPerPage, setVideogamesPerPage] = useState(15)
    //función recorredora del paginado
        const current = (numberpage)=>{
            setActualPage(numberpage)
        }
    //const
        const indexOfLastVideogame= actualPage* videogamesPerPage
        const indexOfFirstVideogame= indexOfLastVideogame - videogamesPerPage
        const videogamesSliced =  videogames.slice(indexOfFirstVideogame, indexOfLastVideogame) 
//fin paginado
        

    // const [search,setSearch] = useState('')

        function  rerender(data){
            dispatch(filters(data))
            setRenderControl(`ordenado por ${filters}`)
            setActualPage(1)
        }
        // function handler(e){
        //     setSearch(e)
        // }
        
return(
    <div className={style.body}> 
        <Navbar 
        // handler={handler}
        />
        <div className={style.content}>
            <div className={style.filters}>
                <Filters
                rerender={rerender}
                // search={search}
                />
            </div>
            

                <Pages  current ={current} actualPage = {actualPage} videogames={videogames.length}/>
            <div className={style.Containervideogames}>
                {/* {videogames.length? */}
                {videogamesSliced &&  videogamesSliced.map(game => {
                    return <Link to={`/home/videogame/${game.idgame}`} key={game.id}>
                        <Videogame
                        videogames= {videogames}
                        key= {game.id}
                        name={game.name}
                        localGenres ={game.localGenres}
                        img={game.img}
                        platforms= {game.platforms}
                        />
                    </Link>
                })}
                {/* <img src='https://i.pinimg.com/originals/91/91/85/919185a188c5cc25655fadfbc9a4a2b4.gif' alt='cargando'></img>} */}
            </div>
        </div>
    </div>
)

}

