const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { 
    crearProducto, 
    obtenerProductos, 
    obtenerProducto, 
    actualizarProducto, 
    borrarProducto 
} = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');


//Llama la funcion Router
const router = Router();


/*
    La ruta es:
    {{url}}/api/productos
*/


//Obtener todas los productos
router.get('/', obtenerProductos);

//Obtener un producto por ID
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);

//Crear una producto 
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'ID de categoria no valida').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto);

//Actualizar una producto 
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], actualizarProducto);

//Borrar una producto - Privado - Solo ADMIN
//id de mongo
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    //custom validator
    check('id').custom( existeProductoPorId ),
    validarCampos,
], borrarProducto);

module.exports = router;