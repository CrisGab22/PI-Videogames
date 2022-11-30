//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const {genresCreator, videogamesCreator} = require('./src/controllers.js/controllers')
const {Genre, Videogame} = require('./src/db')
require('dotenv').config()
// Syncing all the models at once.
conn.sync({ force: false }).then( () => { // ----> no se va a resetear toda la DB cuando se hagan cambios 
  server.listen(process.env.PORT, async () => {

    //creamos los generos en la BD (si es que ya no existen)
    let tableGenre = await Genre.findAll() // miramos si que hay datos en la tabla de Genre de BD
    if(tableGenre.length<1) {genresCreator() // si no hay datos en genre creamos los datos  
      console.log(`Se han añadido los generos a la DB`)
    }

    //guardanmos la información de la API a la base datos para mejorar los tiempos de respuesta
    let tableVideogame = await Videogame.findAll() // miramos si que hay datos en la tabla de Genre de BD
    if(tableVideogame.length<1) {videogamesCreator() // si no hay datos en videogames pedimos y guardamos los datos  
      console.log(`Se han guardado los videojuegos de la API a la DB`)
    }

    console.log('%s listening at', process.env.PORT); // eslint-disable-line no-console
  });
});
