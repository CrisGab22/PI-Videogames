import React from 'react'
import {  useEffect } from 'react'
import Videogame from './Videogame.jsx';
import {useDispatch,useSelector} from 'react-redux'
import {getAllVideogames} from '../redux/actions'
import style from '../components.css/videogames.module.css'
// import {Link} from 'react-router-dom'

export default function Videogames (props) {
const dispatch = useDispatch()
let videogames = useSelector(state => state.videogames)

useEffect(() =>{
    dispatch(getAllVideogames())
},[dispatch])

function handlerReset(e){
    // e.preventDefault()
    dispatch(getAllVideogames)
}

return(
    <div> 
        <select name='Orden alfabético'>
            <option value={'ascending'}>A-Z</option>
            <option value={'descending'}>Z-A</option>
        </select>
        <select name='Género'>
            <option value={'all'}>Todos</option>
        </select>
        <select name='Origen'>
            <option value={'all'}>Todos</option>
            <option value={'exitens'}>existentes</option>
            <option value={'created'}>creados</option>
        </select>
        <select name='Rating'>
            <option value={'top rated'}>Mejores votados</option>
            <option value={'worst rated'}>Peores votados</option>
        </select>

        <button onClick={e => handlerReset(e)}> Volver a cargar todos los personajes</button>
        <div className={style.Containervideogames}>
            {videogames &&  videogames.map(game => {
                return <Videogame
                key= {game.id}
                name={game.name}
                released={game.released}
                img={game.img}
                />
            })}
        </div>
    </div>
)

}

