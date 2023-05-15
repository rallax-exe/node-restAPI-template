const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


//Llama la funcion Router
const router = Router();

/*
    La req y res pasan por
    referencia al controlador (usuariosGet)
    ahi se transfiere toda la info
*/
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasenia es obligatorio').not().isEmpty(),
    validarCampos
], login);



module.exports = router;