const {response} = require('express')
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico')


const getTodo = async (req, res = response) => {
 
 const busqueda = req.params.busqueda
 
 /* para que busque el nombre de forma insensible, es decir que no haya que escribir todo
    el nombre compuesto y respetar las mayusculas */

 const regexp = RegExp( busqueda, 'i')

 /* Esta forma es valida pero hay tres await por lo que el proceso de
    busqueda es mas lento, porque tiene que pasar por cada await uno por uno
 /* 
 const usuarios = await Usuario.find({nombre:regexp});
 const hospitales = await Hospital.find({nombre:regexp});
 const medicos = await Medico.find({nombre:regexp});

 */

 const[usuarios, medicos, hospitales] = await Promise.all([
         Usuario.find({nombre:regexp}),
         Hospital.find({nombre:regexp}),
         Medico.find({nombre:regexp}),
 ])

  res.json({
      ok:true,
      usuarios,
      hospitales,
      medicos,
  })

}

const getColeccion = async (req, res = response) => {
 
  const tabla =  req.params.tabla;
  const busqueda = req.params.busqueda;
  const regexp = RegExp( busqueda, 'i');

  let data = [];

  switch(tabla) {
    case 'medicos':
      data = await Medico.find({nombre:regexp})
                         .populate('usuario', 'nombre img')
                         .populate('hospital', 'nombre img');
    
      break;
     
    case 'hospitales':
      data = await Hospital.find({nombre:regexp})
                           .populate('usuario', 'nombre img');
     
      break;

     case 'usuarios':
      data = await Usuario.find({nombre:regexp});
     
      break;


    default:
     
     return  res.status(400).json({
        ok:false,
        msg:'la tabla tiene que ser de la coleccion usuario, hospitales o medicos'
      })
 

  }

  res.json({
    ok:true,
    resultados: data
})

}
module.exports= {getTodo,getColeccion }