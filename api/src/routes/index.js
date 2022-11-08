const { Router } = require('express');
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

require('dotenv').config();
const {API_URL, API_KEY} = process.env
console.log(API_URL, API_KEY)

const getApiInfo = async () =>{
    const call = await axios.get(`${API_URL}=${API_KEY}`)
    const response = await call.data.results.map(game =>{
        return{
            name: game.name
        }
    })
    return response
}

let a = getApiInfo()
setTimeout(() => console.log(a),1000)


module.exports = router;
