const express = require('express')
const routeVideogames = express.Router()
const {Videogame, Genre} = require('../db')

routeVideogames.get('/', async(req, res) =>{
    const name = req.query.name
    const Allvideogames = await Videogame.findAll({
        attributes:{
            exclude: ['createdAt', 'updatedAt']
        } //borra idgame si no lo crees necesario
        ,
            include:{
                model: Genre,
                attributes: ['name'], // me trae solo el atributo nombre de la tabla Genre
                through: { 
                    attributes: [], // con esto solo me trae información de los atributos de la tabla (ignorando la información de la tabla intermedia)
                },
            }
    })
    
    if(name){
        let VideogameName = await Allvideogames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()))

        if (VideogameName.length <16) { // verificamos que los juegos que coincidan con el nombre sean menores a 15 para traerlos todos
            res.status(200).send(VideogameName)
        }
        else if (VideogameName.length >15){
            res.status(200).send(VideogameName.slice(0,15))
        }
        }
    else{
        res.status(200).send(Allvideogames)
    }
});


routeVideogames.post('/', async(req,res) =>{
    const {name, description, released, rating, img, platforms, genres} = req.body

    let newVideogame = await Videogame.create({ //agregamos un videojuego en nuestra base de datos rellenando los siguientes parámetros
        name,
        description,
        released,
        rating,
        img,
        platforms,
        localGenres: genres,
        createdInDb : true,
    });

    let genreDb = await Genre.findAll({ // primero verificamos que el genero pasado esté disponible en nuestra tabla de generos y lo guardamos en una constante
        where:{
            name: genres 
        }
    });

    newVideogame.addGenre(genreDb)
    res.send('Su videojuego se ha agregado!!!')
})


module.exports = routeVideogames;

