const express = require('express')
const routeVideogame = express.Router()
const {videogameId} = require('../controllers.js/controllers')


routeVideogame.get('/:idVideogame', async(req,res) =>{
    const {idVideogame} = req.params
    
    try {
        const gameInfo = await videogameId(idVideogame)
        if(gameInfo.name) res.status(200).send(gameInfo)
        
    } catch (error) {
        res.status(404).json({error: error.message})
    }

    //te falta hacer algo en caso de que quieras acceder a la informacion de un juego que no provenga de la API (sino que fue creado por ti)
})

module.exports= routeVideogame