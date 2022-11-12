const express = require('express')
const routeVideogame = express.Router()
const {videogameId, videogameDbId} = require('../controllers.js/controllers')


routeVideogame.get('/:idVideogame', async(req,res) =>{
    const {idVideogame} = req.params
    
    if(idVideogame <= 111111110){ // esto es en caso de que sea un juego de la Api
        try {
            const gameInfo = await videogameId(idVideogame)
            if(gameInfo.name) res.status(200).send(gameInfo)
            
        } catch (error) {
            res.status(404).send("Lo sentimos el ID de este juego no es válido")
        }
    }
    else{    // En caso de que sea un juego creado guardado en mi BD
        const gameCreatedInfo = await videogameDbId(idVideogame)
        if(gameCreatedInfo.length){
            res.status(200).send(gameCreatedInfo)
        }
        else{
            res.status(404).send("Lo sentimos el ID de este juego no está disponible en nuestra base de datos")
        }
    }
})




module.exports= routeVideogame