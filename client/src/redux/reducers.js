import {GET_ALL_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRES, FILTER_BY_ALPHABETICALLY, FILTER_BY_ORIGIN } from "./actions";
const initialState={
    videogames: [],
    genres: [],
    videogamesFiltered:[]
};

const rootReducer = (state= initialState, action) =>{
    switch(action.type){
        case GET_ALL_VIDEOGAMES:{
            return {
                ...state,
                videogames: action.payload,
                videogamesFiltered: action.payload,
            }
        }
        case GET_GENRES:{
            return{
                ...state,
                genres: action.payload
            }
        }

        case FILTER_BY_GENRES:{
            
            if(action.payload === 'All'){
                return{
                    ...state,
                    videogamesFiltered: state.videogames  
                }
            }
            else{
                let Filtered = state.videogames.filter(game=> game.localGenres.filter(genre => genre == action.payload ) == action.payload)
                return{
                    ...state,
                    videogamesFiltered: Filtered
                }
            }
        }

        // case FILTER_BY_ALPHABETICALLY:{
        //     if(action.payload === 'None'){
        //         return{
        //             ...state,
        //             videogamesFiltered: state.videogames
        //         }
        //     }
        //     if(action.payload === 'Ascending'){
        //         let a = () => state.videogamesFiltered.sort((a,b)=> {
        //             if(a.name < b.name){
        //                 return-1
        //             }
        //             if(a.name > b.name){
        //                 return 1
        //             }
        //             return 0
        //         })
        //         console.log(a())
        //         return{
        //             ...state,
        //             videogamesFiltered: a()
        //         }
        //     }
        //     if(action.payload === 'Descending'){
        //         let z =() => state.videogamesFiltered.sort((a,b)=> {
        //             if(a.name < b.name){
        //                 return 1
        //             }
        //             if(a.name > b.name){
        //                 return -1
        //             }
        //             return 0
        //         })
        //         console.log(z())
        //         return{
        //             ...state,
        //             videogamesFiltered:  z()  
        //         }
        //     }
        // }
        case FILTER_BY_ORIGIN:{
            if(action.payload === 'All'){
                return{
                    state,
                    videogamesFiltered: state.videogames
                }
            }
            if(action.payload === 'Created'){
                let origin = state.videogames
                console.log('created')
                return{
                    state,
                    videogamesFiltered: origin
                }
            }
            if(action.payload === 'Existent'){
                let origin = state.videogames
                console.log('existent');
                return{
                    state,
                    videogamesFiltered: origin
                }
            }
        }
        default:{
            return {...state}
        }
    }
}

export default rootReducer;