const { Router } = require('express');
const axios = require('axios') //alguna vez lo usas?
const getAllVideogames = require('../controllers.js/controllers') // funcion que me devuelve los primeros 100 videojuegos de la API


const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// const getGamesApi = async() =>{
//     const info = await getAllGamesApi()
//     console.log(info)
// }




router.get('/videogames', async(req, res) =>{
    const name = req.query.name
    const Allvideogames = await getAllVideogames()
    
    if(name){
        let VideogameName = await Allvideogames.filter(game => game.name.toLowerCase() == name.toLowerCase())
        if(VideogameName.length){
            res.status(200).send(VideogameName)
        }
        else{
            res.status(404).send('no se encontró el videojuego con ese nombre')
        }
    }
    else{
        res.status(200).send(Allvideogames)
    }
})





module.exports = router;
