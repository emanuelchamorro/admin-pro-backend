const {response} = require('express')
const {validationResult} = require('express-validator')

const validarCampos = (req, res, next) => {
    
 const errores = validationResult(req);
    //Si errores no esta vacio...
    if(!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })
    }
next();

}

module.exports = {validarCampos}