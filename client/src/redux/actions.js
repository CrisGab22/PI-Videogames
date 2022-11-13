import axios from 'axios'
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
// const GET_VIDEOGAMES_DB = 'GET_VIDEOGAMES_DB'

export function getAllVideogames(){
    return async function videogames(dispatch){
        const info = await axios.get('http://localhost:3001/videogames')
        .then(info => info.data)
        .then(info => dispatch({type: GET_ALL_VIDEOGAMES, payload: info}))
        return info
    } 
};


