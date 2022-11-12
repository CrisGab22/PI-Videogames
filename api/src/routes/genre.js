const express = require('express')
const routeGenre = express.Router()
const {Genre} = require('../db')

routeGenre.get('/', async(req,res) =>{
    const allGenres = await Genre.findAll({
        attributes: ["id", "name"]
    }) 
    res.status(200).send(allGenres)
    res.status(404).send("Ocurrio un error inesperado")
})


module.exports= routeGenre  