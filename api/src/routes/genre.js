const express = require('express')
const routeGenre = express.Router()
const {Genre} = require('../db')

routeGenre.get('/', async(req,res) =>{
    const allGenres = await Genre.findAll() 
    res.status(200).send(allGenres)
})


module.exports= routeGenre  