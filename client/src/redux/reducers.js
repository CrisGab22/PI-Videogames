import {GET_VIDEOGAMES_BY_NAME, GET_ALL_VIDEOGAMES, GET_GENRES, GET_DETAILS, RESET_DETAILS, FILTERS } from "./actions";
const initialState={
    controlVideogameByName: false,
    details:[],
    genres: [],
    videogames: [],
    videogamesByName:[],
    videogamesFiltered: [],
    videogamesRender:[],

};

const rootReducer = (state= initialState, action) =>{
    switch(action.type){
        case GET_ALL_VIDEOGAMES:{
            return {
                ...state,
                controlVideogameByName: false,
                videogames: action.payload,  //juegos de la API (no se modifica nunca)
                videogamesByName:action.payload, //juegos sobre los cuales vamos a trabajar el filtrado 
                videogamesFiltered: action.payload,  //juegos con filtros aplicados
                videogamesRender: action.payload,  //lo que se renderiza 
            }
        }

        case GET_GENRES:{
            return{
                ...state,
                genres: action.payload
            }
        }

        case GET_DETAILS:{
            if(!Array.isArray(action.payload)){
                return{
                    ...state,
                    details: action.payload
                }
            }
            return{
                ...state,
                details: action.payload[0]
            }
        }


        case RESET_DETAILS:{  
            return{
                ...state,
                details:[]
            }
        }

        case GET_VIDEOGAMES_BY_NAME:{
            if(action.payload === 'void'){         
                return{
                    ...state,
                    controlVideogameByName: false,
                    videogamesRender:state.videogames,
                    videogamesByName: state.videogames
                }
            }
            else if(action.payload.length>1){
                return{
                    ...state,
                    controlVideogameByName: false,
                    videogamesRender: action.payload,
                    videogamesByName: action.payload
                }
            }
            else{
                return{
                    ...state,
                    controlVideogameByName: true,
                    videogamesRender: action.payload,
                    videogamesByName: action.payload
                }
            }
        }
        // eslint-disable-next-line
        case FILTERS:{
            state={
                ...state,
                videogamesFiltered: state.videogamesByName, //reseteamos nuestro filtros cada vez que hacemos un filtro nuevo 
            } 
            //Filtramos por género
            if(action.payload.genres !== "All"){
                // eslint-disable-next-line
                let Filtered = state.videogamesFiltered.filter(game=> game.localGenres.filter(genre => genre === action.payload.genres) == action.payload.genres)
                state={
                    ...state,
                    videogamesFiltered: Filtered,
                }
            }
        
            //Filtramos por origen
            if(action.payload.origin !== 'All'){
                let Filtered = state.videogamesFiltered.filter(game=> game.createdInDb === (action.payload.origin !== 'Existent'? true:false))
                state={
                    ...state,
                    videogamesFiltered:Filtered,
            }
            }

            //Filtramos por rating
            if(action.payload.rating !== 'none'){
                
                if(action.payload.rating === 'Worst-Rated'){
                    let rating = state.videogamesFiltered.sort((a,b)=> {
                        if(a.rating < b.rating){
                            return-1
                        }
                        if(a.rating > b.rating){
                            return 1
                        }
                        return 0
                    })
                    state={
                        ...state,
                        videogamesFiltered:  rating.slice(0,rating.length)  //no sé porque, pero sin el slice no funciona para renderizar de ida y vuelta
                    } 
                }
                else{

                    let rating= state.videogamesFiltered.sort((a,b)=> {
                        if(a.rating < b.rating){
                            return 1
                        }
                        if(a.rating > b.rating){
                            return -1
                        }
                        return 0
                    })
                    
                    state={
                        ...state,
                        videogamesFiltered:  rating.slice(0,rating.length)
                    }
                }
            }

            //Filtramos por orden alfabetico
            if(action.payload.alphabetically === 'Ascending'){
                let abc =state.videogamesFiltered.sort((a,b)=> {
                    if(a.name < b.name){
                        return-1
                    }
                    if(a.name > b.name){
                        return 1
                    }
                    return 0
                })
                state={
                    ...state,
                    videogamesFiltered:  abc.slice(0,abc.length)
                }
            }
            if(action.payload.alphabetically === 'Descending'){
                let abc =state.videogamesFiltered.sort((a,b)=> {
                    if(a.name > b.name){
                        return-1
                    }
                    if(a.name < b.name){
                        return 1
                    }
                    return 0
                })
                state={
                    ...state,
                    videogamesFiltered:  abc.slice(0,abc.length)
                }
            }
            if(state.videogamesFiltered.length<1){
                return {...state,
                    videogamesRender:state.videogamesFiltered,
                    controlVideogameByName: true,
                } 
            }
            else{
                return {...state,
                    controlVideogameByName: false,
                    videogamesRender:state.videogamesFiltered
                }
            } 
        }
        default:{
            return {...state}
        }
    }
}

export default rootReducer;