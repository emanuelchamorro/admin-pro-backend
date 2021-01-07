const {response} = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { verifyGoogle } = require('../helpers/google-verify');
const { getMenuFront } = require('../helpers/menu-frontend');

const login = async(req, res= response) => {

const {email, password} = req.body

    try{

    //Verificar Email
    const usuarioDB = await Usuario.findOne({email});
    if(!usuarioDB) {
        return res.status(404).json({
            ok:false,
            msg:'El email no es válido'
        });
    }

   //Verificar Password
  const validPassword = bcrypt.compareSync(password, usuarioDB.password);
  if(!validPassword) {
      return res.status(400).json({
          ok:false,
          msg:'El password no es válido'
      });
  }

  //Generar TOKEN - JWT

    const token = await generarJWT(usuarioDB.id);


  res.json({
      ok:true,
      token,
      menu:getMenuFront(usuarioDB.role)
  });

} catch(error){

        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        })
    }
}


const googleSignIn = async(req, res= response) => {

   const googleToken = req.body.token;

   try{

    //Verificar token

    const {name, email, picture } = await verifyGoogle(googleToken);

    //Crear usuario en base de datos

    const usuarioDB = await Usuario.findOne({email});

    let usuario;

    if(!usuarioDB) {
       //si no existe usuario en base de datos y entra por google sign in
        usuario = new Usuario({
            nombre: name,
            email,
            password: '@',
            img: picture,
            google: true,

        });
    } else {
      //existe usuario en la base de datos
        usuario = usuarioDB;
        usuario.google = true;
    }
   
    //Guardar en DB

    await usuario.save();

   //Generar TOKEN - JWT

    const token = await generarJWT(usuario.id);

    res.json({
        ok:true,
        token,
        menu:getMenuFront(usuario.role)
    });
   }
   catch(error) {

    res.status(401).json({
        ok:false,
        msg:'token no es correcto'
       
    });

   }

}


const renewToken = async(req,res = response) => {

    const uid = req.uid

    //Generar TOKEN - JWT
    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);
   
    res.json({
        ok:true,
        token,
        usuario,
        menu:getMenuFront(usuario.role)
    })

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}