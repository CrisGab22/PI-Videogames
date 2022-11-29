import axios from 'axios'
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const GET_GENRES = 'GET_GENRES'
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES'
export const FILTER_BY_ALPHABETICALLY = 'FILTER_BY_ALPHABETICALLY'
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN'
export const FILTER_BY_RATING = 'FILTER_BY_RATING'
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME'
export const GET_DETAILS = 'GET_DETAILS'
export const RESET_DETAILS = 'RESET_DETAILS'
export const FILTERS = 'FILTERS'

export function getAllVideogames(){
    return async function videogames(dispatch){
        const videogames = await axios.get('http://localhost:3001/videogames')
        .then(info => info.data)
        .then(info => dispatch({type: GET_ALL_VIDEOGAMES, payload: info}))
        return videogames
    } 
};
export function postVideogame(info){
    function partitionDescription() {
        let description = info.description
        let slice1 = description.slice(0,255)
        let slice2 = description.slice(255,510)
        let slice3 = description.slice(500,765) 
        let slice4 = description.slice(765,1020) 
        return info = {...info,
        description:slice1,
        description1:slice2,
        description2:slice3,
        description3:slice4,
    }
    }
    return async function postVideogame(){
        partitionDescription(info)
        const postVideogame = await axios.post('http://localhost:3001/videogames', info)
        return postVideogame
    }
}

export function updateVideogame(info,params){
    function partitionDescription() {
        let description = info.description
        let slice1 = description.slice(0,255)
        let slice2 = description.slice(255,510)
        let slice3 = description.slice(500,765) 
        let slice4 = description.slice(765,1020) 
        return info = {...info,
        description:slice1,
        description1:slice2,
        description2:slice3,
        description3:slice4,
    }
}
partitionDescription(info)
    return async function updateVideogame(){
        const putVideogame = await axios.put(`http://localhost:3001/videogame/${params.id}`, info)
        return putVideogame
    }

}

export function getAllGenres(){
    return async function genres(dispatch){
        const genres = await axios.get('http://localhost:3001/genres')
        .then(info => info.data)
        .then(info => dispatch({type: GET_GENRES, payload: info}))
        return genres
    }
}

export function getGameDetails(params){
    return async function details(dispatch){
        try {
            const details = await axios.get(`http://localhost:3001/videogame/${params}`)
            .then(info => info.data)
            .then(info => dispatch({type: GET_DETAILS, payload:info}))
            return details
        } catch (error) {
            let errorDb= error.response.data
            dispatch({type: GET_DETAILS, payload:errorDb})
        }
    }
}

export function resetGameDetails(){
    return function reset(dispatch){
        return dispatch ({type: RESET_DETAILS})
    }
}

export function deleteGame(params){
    return async function deletegame(){
        const deleted = await axios.delete(`http://localhost:3001/videogame/${params.id}`)
        return deleted
    }
}
 

export function getAllVideogamesName(name){
    if(name.length){
        return async function videogamesName(dispatch){
                const videogamesName = await axios.get(`http://localhost:3001/videogames?name=${name}`)
                .then(info => info.data)
                .then(info => dispatch({type: GET_VIDEOGAMES_BY_NAME, payload: info}))
                return videogamesName
        }
    }
    else{
        return { 
            type:GET_VIDEOGAMES_BY_NAME,
            payload: 'void'
        }
    }
}

//haz lo del back acá 
export function filters(data){
    return{
        type:FILTERS,
        payload:data
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
export function filterByRating(rating){
    return{
        type: FILTER_BY_RATING,
        payload: rating
    }
}


