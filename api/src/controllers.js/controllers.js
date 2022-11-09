require('dotenv').config();
const {API_URL_GAMES, API_KEY, API_URL_GENRES} = process.env
const axios = require('axios')
const {Videogame, Genre} = require('../db')

//funcion que me trae todos los primeros 100 juegos de la API 
getAllGamesApi = async(videogames =[]) => await Promise.allSettled([ //le ponemos como valor por defecto el videogames para así tener un array contenedor de videojuegos sin necesidad de que me pasen un parámetro 
    axios.get(`${API_URL_GAMES}=${API_KEY}&page=1`),
    // axios.get(`${API_URL_GAMES}=${API_KEY}&page=2`),
    // axios.get(`${API_URL_GAMES}=${API_KEY}&page=3`),
    // axios.get(`${API_URL_GAMES}=${API_KEY}&page=4`),
    // axios.get(`${API_URL_GAMES}=${API_KEY}&page=5`),
])
    .then(values =>{     
        return [respuesta1, respuesta2, respuesta3, respuesta4, respuesta5] = values}) //guardamos los resultados de cada promesa en un array 
    .then(info => {
        return info.map(promiseRes=> promiseRes.value.data.results)}) // recorremos el array con las promesas resueltas, y por cada una de ellas nos metemos a la información directa de cada juego para solo quedarnos con la info que necesitamos
    .then(info => {
        return info.map(promiseRes => promiseRes.map(game => { // Ahora solo nos guardamos la información necesaria de cada juego en un objeto 
            return{
                // id: game.id,
                name: game.name,
                // released: game.released,
                // rating: game.rating,
                // img: game.background_image,
                // platforms: game.platforms.map(el => el.platform.name)       
       }
   })) 
})
.then(info=> {
    return info.map(array => videogames = videogames.concat(array)) // acá unimos todas las respuestas de las promesas en un solo array
})
.then(info => info = videogames);  // como ahora la información no se ha modificado (modificamos el array pero no la información de las respuestas de la promesas en sí), seteamos la información con la información del array contenedor y lo retornamos 


//funcion que me trae todos los juegos de la DB
getAllGamesDb = async() =>{
    return await Videogame.findAll({
        include:{
            model: Genre
        }
    })
};

//función que me trae todos los generos de la API
getAllGenreApi = async() => {
    const allInfoApiGenres =  await axios.get(`${API_URL_GENRES}=${API_KEY}`)
    .then(info =>info.data.results)
    .then(info => info.map(genre => {
        return{
            name: genre.name,
        }
    }));
    const allGenresApi = await allInfoApiGenres
    return allGenresApi
}


//funcion que concatena la info de las 2 anteriores funciones
getAllVideogames = async() =>{
    const apiGames = await getAllGamesApi()
    const dbGames = await getAllGamesDb()
    const AllGames = apiGames.concat(dbGames)
    return AllGames
} 

module.exports= {
    getAllVideogames,
    getAllGenreApi,
}