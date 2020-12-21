const {response} = require('express')
const Hospital = require('../models/hospital')

const getHospitales = async(req,res = response) => {

// populate me sirve para acceder y mostrar otra info del usuario que crea el hospital y no solo el id
    const hospitales = await Hospital.find().populate('usuario', 'nombre email');

    res.json({
        ok:true,
        hospitales
    })
}

const crearHospital = async(req,res = response) => {


//una vez pasado el middleware de validarJWT se obtiene el uid del usuario que crea el hospital (es required en el modelo)
 const uid = req.uid;
 //Desestructuro el modelo con ({}) para agregarle el campo del id del usuario, antes de guardar el hospital
 const hospital = new Hospital({
      usuario: uid,   
      ...req.body
      });
 try{

 const hospitalDB = await hospital.save();

    res.json({
        ok:true,
        hospital: hospitalDB
    });

 }catch(error){

    console.log(error)
    res.status(500).json({
        ok:false,
        msg:'Hable con el admin'
    })
}

   
}

const actualizarHospital = async(req,res = response) => {

   const id = req.params.id;
   const uid = req.uid

   try{

   const hospital = await Hospital.findById(id);

   if (!hospital) {
 
    res.status(404).json({
        ok:false,
        msg:'Hospital no encontrado por id'
    })

   }


 const cambioHospital = {
    ...req.body,
    usuario:uid
}

 const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambioHospital, {new: true})

    res.json({
        ok:true,
        msg:'actualizarHospitales',
        hospital: hospitalActualizado
    })

   } catch(error){
    
     res.status(500).json({
         ok:false,
         msg:'Hable con el administrador'
     })
   }




}


const borrarHospital = async(req,res = response) => {
 
 const id = req.params.id;  

 try{
    
    const hospital = await Hospital.findById(id);

    if (!hospital) {
 
        res.status(404).json({
            ok:false,
            msg:'Hospital no encontrado por id'
        })
    
       }

 await Hospital.findByIdAndDelete(id) ;

res.json({
    ok:true,
    msg:'hospital eliminado'
})

} catch(error) {

    res.status(500).json({
        ok:false,
        msg:'Hable con el administrador'
    })
  }
 
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}