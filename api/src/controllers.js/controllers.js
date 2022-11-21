require('dotenv').config();
const {API_URL_GAMES, API_KEY, API_URL_GENRES, API_URL_GAMEID} = process.env
const axios = require('axios')
const {Videogame, Genre} = require('../db')

//funcion que me trae todos los primeros 100 juegos de la API 
getAllGamesApi = async(videogames =[]) => await Promise.allSettled([ //le ponemos como valor por defecto el videogames para así tener un array contenedor de videojuegos sin necesidad de que me pasen un parámetro 
    axios.get(`${API_URL_GAMES}=${API_KEY}&page=1`),
    axios.get(`${API_URL_GAMES}=${API_KEY}&page=2`),
    axios.get(`${API_URL_GAMES}=${API_KEY}&page=3`),
    axios.get(`${API_URL_GAMES}=${API_KEY}&page=4`),
    axios.get(`${API_URL_GAMES}=${API_KEY}&page=5`),
])
    .then(values =>{     
        return [respuesta1, respuesta2, respuesta3, respuesta4, respuesta5] = values}) //guardamos los resultados de cada promesa en un array 
    .then(info => {
        return info.map(promiseRes=> promiseRes.value.data.results)}) // recorremos el array con las promesas resueltas, y por cada una de ellas nos metemos a la información directa de cada juego para solo quedarnos con la info que necesitamos
    .then(info => {
        return info.map(promiseRes => promiseRes.map(game => { // Ahora solo nos guardamos la información necesaria de cada juego en un objeto 
            return{
                idgame: game.id,
                name: game.name,
                released: game.released,
                rating: game.rating,
                img: game.background_image,
                platforms: game.platforms.map(el => [ el.platform.name,el.platform.id]),
                localGenres: game.genres.map(el => el.name)       
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
            model: Genre,
            attributes: ['name'], // me trae solo el atributo nombre
            through: { 
                attributes: [], // con esto solo me trae información de la atributos de la tabla (ignorando la información de la tabla intermedia)
            },
        },
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

//función que crea los generos en mi base datos a partir de la función anterior
const genresCreator = async() =>{
    const genres = await getAllGenreApi()
    genres.map(genre =>{
        Genre.findOrCreate({
            where:{
                name: genre.name,
            }
        })
    })
} 

// funcion que guarda los videojuegos de la API en la DB
const videogamesCreator = async() =>{
    const videogames = await getAllGamesApi()
    videogames.map(game =>{
        Videogame.findOrCreate({
            where:{
                idgame: game.idgame,
                name: game.name,
                released: game.released,
                rating: game.rating,
                img: game.img,
                platforms: game.platforms,
                localGenres: game.localGenres
            }
        })
    })
}

//funcion que me trae la información específica de un videojuego
const videogameId = async(id) =>{
    try {
        const gameInfo = await axios.get(`${API_URL_GAMEID}/${id}?key=${API_KEY}`)
        .then(info => info.data)
        
        const filterGameInfo = {
            img:gameInfo.background_image,
            name: gameInfo.name,
            description: gameInfo.description,
            metacritic: gameInfo.metacritic,
            released: gameInfo.released,
            rating: gameInfo.rating,
            alternative_names: gameInfo.alternative_names,
            platforms: gameInfo.platforms.map(platform => platform.platform.name),
            developers: gameInfo.developers.map(dev => dev.name),
            genres: gameInfo.genres.map(genre=> genre.name),
            stores: gameInfo.stores.map(el => el.store.name),
            createdInDb: false
        }
        return(filterGameInfo)
    } catch (error) {
        return { error: 'Lo sentimos el ID de este juego no es válido' }
    }
}

//funcion que me busca los juegos creados en mi DB
const videogameDbId = async (id) =>{
    try {
        const gameInfo =await Videogame.findAll({
            where:{
                "idgame": id 
            },
            include:{
                model: Genre,
                attributes: ['name'], // me trae solo el atributo nombre de la tabla Genre
                through: { 
                    attributes: [], // con esto solo me trae información de los atributos de la tabla (ignorando la información de la tabla intermedia)
                },
            }
        })
        if(!gameInfo[0]?.name) throw new Error('Lo sentimos este juego no está disponible en nuestra base de datos')
        return gameInfo
    } catch (error) {
        return {error: error.message}
    }
}

module.exports= {
    genresCreator,
    videogamesCreator,
    videogameId,
    videogameDbId
}