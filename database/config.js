const mongoose = require('mongoose');

const dbConnection = async() => {
  
    try {
         //en vez de poner aqui yel link de coneccion al cluster de atlas uso la variable de entorno del archivo .env
        await mongoose.connect(process.env.DB_CNN ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
          });

          console.log('DB Online')

    } catch(error) {

      console.log(error); 
      throw new Error('Error a la hora de iniciar DB')

    }
 
 
}

module.exports = {
    dbConnection
}