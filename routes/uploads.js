/* Ruta: /api/uploads/ */

const { Router } = require('express')
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt')
const expressFileUpload = require('express-fileupload');



const router = Router()

//Copy paste del ejemplo de la pagina, solo modifoc app por router
router.use( expressFileUpload() );

router.put('/:tipo/:id', validarJWT , fileUpload);

router.get('/:tipo/:foto', retornaImagen);



module.exports = router