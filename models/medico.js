const {Schema, model} = require('mongoose')

const medicoSchema = Schema({
    nombre: {
     type: String,
     required: true,
    },

    img: {
        type: String
    },
    usuario: {
     //Relaciono este esquema con el de usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,   
    },
    hospital: {
        //Relaciono este esquema con el hospital
           type: Schema.Types.ObjectId,
           ref: 'Hospital',
           required: true, 
       },
//collection es para modificarle el nombre a la coleccion
}, { collection: 'medicos' });

module.exports = model('Medico', medicoSchema);