

const  validaCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const  validaRoles = require('../middlewares/validar-roles');


module.exports = {

    //Con spred mantenemos todas las funciones de cada exportacion
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,

}