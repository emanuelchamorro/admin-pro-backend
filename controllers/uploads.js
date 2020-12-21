const path = require('path');
const fs = require('fs');
const {response} = require('express');
const {actualizarImagen} = require('../helpers/actualizar-imagen');
const { v4: uuidv4 } = require('uuid');

const fileUpload = (req,res=response) => {

 const tipo = req.params.tipo;
 const id = req.params.id;

 //Validar tipo
 const tiposValidos = ['usuarios', 'medicos', 'hospitales'];
 if(!tiposValidos.includes(tipo)){
     return res.status(400).json({
         ok:false,
         msg:'No es un medico, usuario u hospital'
     })
 }

 // Validar que exista un archivo - Copy paste de la pagina de la libreria
 
if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
        ok:false,
        msg:'No hay ningun archivo'
    });
}

//Procesar el archivo...
 
///files viene del middleware de imageupload e imagen es el key del body en postman
 const file = req.files.imagen;

 ///cortar el nombre alli donde haya punto o puntos
const nombreCortado = file.name.split('.');
///quedarse con la ultima separacion por punto, que siempre va a ser la extension de la img
const extensionArchivo = nombreCortado[nombreCortado.length - 1];


//Validar lel archivo...
   
const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
if(!extensionesValidas.includes(extensionArchivo)){
    return res.status(400).json({
        ok:false,
        msg:'No es una extension valida'
    });
}

//Generar nombre del archivo

const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

//Path para guardar la imagen

const path = `./uploads/${tipo}/${nombreArchivo}`;

//Mover la imagen
  // Use the mv() method to place the file somewhere on your server
  file.mv(path, (err)=> {
    if (err){
        console.log(err)
        return res.status(500).json({
          ok:false,
          msg:'Error al mover la img'
      });
    }

//Actualizar imagen en base de datos

   actualizarImagen(id, tipo, nombreArchivo);

    res.json({
        ok:true,
        msg:'Archivo subido!',
        nombreArchivo
    })
  });


}

const retornaImagen = (req, res= response) =>{
    
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    //este path es el importado del modulo de node
    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);


  
    
    if(fs.existsSync(pathImg)){

        res.sendFile(pathImg);
    
    } else {
     //imagen por defecto
     const pathImg = path.join(__dirname,`../uploads/no-img.png`);
     res.sendFile(pathImg);
    }


   
}



module.exports = {
    fileUpload,
    retornaImagen,
}