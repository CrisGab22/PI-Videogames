import React, { useState, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllGenres, getAllVideogames, filters} from '../redux/actions'
import style from '../components.css/home.module.css'
import {Link} from 'react-router-dom'


//Importación de Componentes
import SearchBar from './SearchBar.jsx'
import Pages from './Pages.jsx';
import Videogame from './Videogame.jsx';
import Filters from './Filters'
import Navbar from './Nav'




export default function Videogames () {

    
//react-redux
    let videogames = useSelector(state => state.videogamesRender)
    let controlVideogameByName = useSelector(state=> state.controlVideogameByName)
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
        <div className={style.glass}>
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
                <div className={style.SearchBarContainer}>
                    <SearchBar/> 
                </div>
                <Pages  current ={current} actualPage = {videogames? actualPage:1} videogames={videogames.length}/>
                <div className={style.ContainervideogamesGeneral}>
                {videogames.length?
                    <div className={style.Containervideogames}>

                    {videogamesSliced &&  videogamesSliced.map(game => {
                        return <Link to={`/home/videogame/${game.idgame}`} key={game.id} className={style.videogameContainer}>
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
                </div>
                :
                controlVideogameByName?
                <div className={style.containerLoading}>
                    <img src="https://ouch-cdn2.icons8.com/AsbSVM0BU7ROdOLjdTM5dQJSblKSu_B9Z4BUw5FOHlQ/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMjQ3/L2RlMmZmMjJmLTI3/YzItNGNkYS1hMTg5/LTU1OGQ5NGNiM2Ez/Mi5zdmc.png" alt="error" className={style.notFound} />
                </div>:
                <div className={style.containerLoading}>
                    <img src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif" alt="cargando" className={style.loading}/>
                </div>    
                }
            </div>
            </div>
        </div>
    </div>
)

}

