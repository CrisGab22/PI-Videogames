import axios from 'axios'
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const GET_GENRES = 'GET_GENRES'
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES'
export const FILTER_BY_ALPHABETICALLY = 'FILTER_BY_ALPHABETICALLY'
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN'
// const GET_VIDEOGAMES_DB = 'GET_VIDEOGAMES_DB'

export function getAllVideogames(){
    return async function videogames(dispatch){
        const videogames = await axios.get('http://localhost:3001/videogames')
        .then(info => info.data)
        .then(info => dispatch({type: GET_ALL_VIDEOGAMES, payload: info}))
        return videogames
    } 
};

export function getAllGenres(){
    return async function genres(dispatch){
        const genres = await axios.get('http://localhost:3001/genres')
        .then(info => info.data)
        .then(info => dispatch({type: GET_GENRES, payload: info}))
        return genres
    }
}

export function filterByGenre(genre){
    return {
        type:FILTER_BY_GENRES,
        payload: genre
    }
}

export function filterByAlphabetically(order){
    return {
        type:FILTER_BY_ALPHABETICALLY,
        payload: order
    }
}

export function filterByOrigin(origin){
    return{
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
}


