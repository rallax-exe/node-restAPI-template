
/*Rutas del API*/

const { Router } = require('express');
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

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;
