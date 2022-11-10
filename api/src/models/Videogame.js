const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false,
    },
    idgame:{  //este parámetro está para los juegos traidos desde la API
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{ //la descripción de los juegos de la API están en otra ruta, y no veo eficiente guardar cada info por los 100 juegos de la API por cada vez que se inicialice el servidor 
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "This game is original of the API, if you wanna kwon about of the description of this game in the API you can get this detail "
    },
    released:{
      type: DataTypes.DATEONLY,
      defaultValue: "2999-12-31" // esta línea no debería ser necesaria cuando se hagan las vadilaciones desde la API
    },
    rating:{
      type: DataTypes.INTEGER,
    },
    img:{
      type: DataTypes.STRING,
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    createdInDb: { //este parámetro se lo va a enviar de manera predeterminada como true desde el backend (así diferenciamos de manera más sencilla de los que creamos de los que nos traemos desde la api)
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });
};
