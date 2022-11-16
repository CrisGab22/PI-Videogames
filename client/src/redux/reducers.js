import {GET_VIDEOGAMES_BY_NAME, GET_ALL_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRES,FILTER_BY_RATING, FILTER_BY_ALPHABETICALLY, FILTER_BY_ORIGIN } from "./actions";
const initialState={
    videogamesByName:[],
    videogames: [],
    genres: [],
    videogamesRender:[],
    videogamesFiltered: [],

};

const rootReducer = (state= initialState, action) =>{
    switch(action.type){
        case GET_ALL_VIDEOGAMES:{
            return {
                ...state,
                videogames: action.payload,
                videogamesRender: action.payload,
                videogamesFiltered: action.payload,
            }
        }
        case GET_GENRES:{
            return{
                ...state,
                genres: action.payload
            }
        }
        case GET_VIDEOGAMES_BY_NAME:{
            return{
                ...state,
                videogamesByName: action.payload,
                videogamesRender:action.payload
            }
        }
        case FILTER_BY_GENRES:{
            
            if(action.payload === "All"){
                return{
                    ...state,
                    videogamesRender: state.videogames,
                    videogamesFiltered: state.videogames

                }
            }
            else{
                let Filtered = state.videogames.filter(game=> game.localGenres.filter(genre => genre === action.payload) == action.payload)
                return{
                    ...state,
                    videogamesRender: Filtered,
                    videogamesFiltered: Filtered,
                }
            }
        }
        
        case FILTER_BY_ORIGIN:{
            if(action.payload === 'All'){
                return{
                    ...state,
                    videogamesRender: state.videogamesFiltered
                }
            }

            else{
                let Filtered = state.videogamesFiltered.filter(game=> game.createdInDb === (action.payload !== 'Existent'? true:false))
                console.log(Filtered)
                return{
                    ...state,
                    videogamesRender: Filtered,
                }
            }

        }
        case FILTER_BY_ALPHABETICALLY:{
            if(action.payload === 'None'){
                return{
                    ...state,
                    videogamesRender: state.videogames
                }
            }
            else{
                
            let abc = action.payload === 'Ascending'?
                state.videogamesFiltered.sort((a,b)=> {
                    if(a.name < b.name){
                        return-1
                    }
                    if(a.name > b.name){
                        return 1
                    }
                    return 0
                }) :
                state.videogamesFiltered.sort((a,b)=> {
                    if(a.name < b.name){
                        return 1
                    }
                    if(a.name > b.name){
                        return -1
                    }
                    return 0
                })
                return{
                    ...state,
                    videogamesFiltered:  abc  
                }
            }
        }
        case FILTER_BY_RATING:{
            if(action.payload === 'None'){
                return{
                    ...state,
                    videogamesRender: state.videogamesFiltered
                }
            }
            else{
                
            let rating = action.payload !== 'Top-Rated'?
                state.videogamesFiltered.sort((a,b)=> {
                    if(a.rating < b.rating){
                        return-1
                    }
                    if(a.rating > b.rating){
                        return 1
                    }
                    return 0
                }) :
                state.videogamesFiltered.sort((a,b)=> {
                    if(a.rating < b.rating){
                        return 1
                    }
                    if(a.rating > b.rating){
                        return -1
                    }
                    return 0
                })
                return{
                    ...state,
                    videogamesRender:  rating,  
                    videogamesFiltered:  rating  
                }
            }
        }
        default:{
            return {...state}
        }
    }
}

export default rootReducer;