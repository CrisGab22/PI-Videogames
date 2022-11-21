const express = require('express')
const routeVideogame = express.Router()
const {videogameId, videogameDbId} = require('../controllers.js/controllers')


routeVideogame.get('/:idVideogame', async(req,res) =>{
    const {idVideogame} = req.params
    
    if(idVideogame <= 111111110){ // esto es en caso de que sea un juego de la Api
        try {
            
            const gameInfo = await videogameId(idVideogame)
            res.status(200).send(gameInfo)
        } catch (error) {
            res.status(404).send(error.message)
        }    
    }
    else{    // En caso de que sea un juego creado guardado en mi BD
        try {
            let gameCreatedInfo = await videogameDbId(idVideogame)
            if(gameCreatedInfo.error) throw new Error(gameCreatedInfo.error)
                gameCreatedInfo[0].description= gameCreatedInfo[0].description+gameCreatedInfo[0].description1
                gameCreatedInfo[0]={
                    name: gameCreatedInfo[0].name,
                    description: gameCreatedInfo[0].description,
                    released: gameCreatedInfo[0].released,
                    rating: gameCreatedInfo[0].rating,
                    platforms: gameCreatedInfo[0].platforms,
                    genres: gameCreatedInfo[0].genres,
                    img: gameCreatedInfo[0].img,
                    createdInDb: gameCreatedInfo[0].createdInDb,
                    
                }
                res.status(200).send(gameCreatedInfo[0])
        } catch (error) {
            res.status(404).json({error: error.message})
        }
}
})




module.exports= routeVideogame