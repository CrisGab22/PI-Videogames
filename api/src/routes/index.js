const { Router } = require('express');


const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeVideogames = require('./videogames')
const routeVideogame = require('./videogame')
const routeGenre = require('./genre')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', routeVideogames )
router.use('/videogame', routeVideogame)
router.use('/genres', routeGenre)



module.exports = router;
