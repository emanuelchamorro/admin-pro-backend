/* Ruta: /routes/medicos */

const { Router } = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos')

const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

//GET para mostrar usuarios

router.get('/', getMedicos);

//POST para crear usuarios
// pongo los middlewares como segundo argumento
router.post('/', 
[
    validarJWT,
    check('nombre','El nombre del medico es necesario').not().isEmpty(),
    check('hospital','El ID del hospital debe ser valido').isMongoId(),
    validarCampos,
],
crearMedico);

router.put('/:id',
[
  validarJWT,
  check('nombre','El nombre del medico es necesario').not().isEmpty(),
  check('hospital','El ID del hospital debe ser valido').isMongoId(),
  validarCampos,
  ],
actualizarMedico);


router.delete('/:id', 
validarJWT,
borrarMedico);

module.exports = router