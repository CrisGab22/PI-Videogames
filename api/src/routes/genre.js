const express = require('express')
const routeGenre = express.Router()
const {getAllGenreApi} = require('../controllers.js/controllers') // funcion que me devuelve los primeros 100 videojuegos de la API
const {Genre, Videogame} = require('../db')

routeGenre.get('/', async(req,res) =>{
    const apiGenres = await getAllGenreApi()
    apiGenres.map(genreGame =>{
        Genre.findOrCreate({
            where: {name : genreGame.name}
        })
    })

    const allGenres = await Genre.findAll() 
    res.status(200).send(allGenres)
})


module.exports= routeGenre  