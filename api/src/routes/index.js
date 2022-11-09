const { Router } = require('express');


const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeVideogames = require('./videogames')
const routeGenre = require('../routes/genre')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', routeVideogames )
router.use('/genre', routeGenre)



module.exports = router;
