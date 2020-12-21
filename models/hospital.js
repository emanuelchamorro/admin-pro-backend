const {Schema, model} = require('mongoose')

const hospitalSchema = Schema({
    nombre: {
     type: String,
     required: true,
    },

    img: {
        type: String
    },
    usuario: {
     //Relaciono este esquema con el de usuario
        required: true,  
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
       
    },
//collection es para modificarle el nombre a la coleccion
}, { collection: 'hospitales' });

module.exports = model('Hospital', hospitalSchema);