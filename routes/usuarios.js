/* Ruta: /api/usuarios */

const { Router } = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')


const {getUsuarios, createUsuarios, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios')
const { validarJWT, validarAdminRole, validarAdminRole_o_mismoUsuario  } = require('../middlewares/validar-jwt')

const router = Router()

//GET para mostrar usuarios

router.get('/',validarJWT, getUsuarios);

//POST para crear usuarios
// pongo los middlewares como segundo argumento
router.post('/', 
[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
  check('password', 'El password es obligatorio').not().isEmpty(), 
  check('email', 'El email es obligatorio' ).isEmail() ,
  //el middleware validarCampos va despues de los checks
  validarCampos,
],
createUsuarios);

router.put('/:id',
[
    validarJWT,
    validarAdminRole_o_mismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
    check('email', 'El email es obligatorio').isEmail(), 
    check('role', 'El role es obligatorio' ).not().isEmpty(),
   //el middleware validarCampos va despues de los checks
    validarCampos,
  ],
actualizarUsuario);


router.delete('/:id', [validarJWT, validarAdminRole],
borrarUsuario);

module.exports = router