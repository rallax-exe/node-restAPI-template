
/*Rutas del API*/

const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, 
        emailExiste,     
        existeUsuarioPorId
} = require('../helpers/db-validators');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch  
} = require('../controllers/usuarios');

//Llama la funcion Router
const router = Router();

/*
    La req y res pasan por
    referencia al controlador (usuariosGet)
    ahi se transfiere toda la info
*/
router.get('/', usuariosGet);

router.put('/:id',[
    /*Middleware para hacer validaciones*/
    check('id', 'No es un ID valido').isMongoId(),
    //custom validator
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/',[
    /*Middleware para hacer validaciones*/
    //Verifica que venga el correo y que sea valido
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo no es valido').isEmail(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //custom validator
    check('rol').custom( esRoleValido ),
    check('correo').custom( emailExiste ),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    //custom validator
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;
