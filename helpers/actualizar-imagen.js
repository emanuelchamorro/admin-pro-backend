//El modulo fs de node permite leer, crear, actualizar y borrar archivos
const fs = require('fs')

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');


const actualizarImagen = async (id,tipo,nombreArchivo) => {

let pathViejo = '';

 switch(tipo) {

    case 'medicos':
        const medico = await Medico.findById(id);

        if(!medico) {
            console.log('no se encontro medico por id')
            false
        }

    //Borrar imagen vieja
    
     pathViejo = `./uploads/medicos/${medico.img}`
     //existsSync chequea si en la path existe, en este caso pathViejo
     if(fs.existsSync(pathViejo)) {
       
        //unlikSynk sirve para eliminar la imagen previa

       fs.unlinkSync(pathViejo);
    
     }

     medico.img = nombreArchivo;
     await medico.save();
     return true;

     break;
//---------------------------//
     case 'hospitales':

            const hospital = await Hospital.findById(id);
    
            if(!hospital) {
                console.log('no se encontro hospital por id')
                false
            }
    
        //Borrar imagen vieja
        
         pathViejo = `./uploads/hospitales/${hospital.img}`
         //existsSync chequea si en la path existe, en este caso pathViejo
         if(fs.existsSync(pathViejo)) {
           
            //unlikSynk sirve para eliminar la imagen previa
    
           fs.unlinkSync(pathViejo);
        
         }
    
         hospital.img = nombreArchivo;
         await hospital.save();
         return true;

         break;
         //---------------------------//

         case 'usuarios':

            const usuario = await Usuario.findById(id);
    
            if(!usuario) {
                console.log('no se encontro usuario por id')
                false
            }
    
        //Borrar imagen vieja
        
         pathViejo = `./uploads/usuarios/${usuario.img}`
         //existsSync chequea si en la path existe, en este caso pathViejo
         if(fs.existsSync(pathViejo)) {
           
            //unlikSynk sirve para eliminar la imagen previa
    
           fs.unlinkSync(pathViejo);
        
         }
    
         usuario.img = nombreArchivo;
         await usuario.save();
         return true;

         break;
 }


}

module.exports = {
    actualizarImagen
}