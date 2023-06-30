const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');


//Llama la funcion Router
const router = Router();


/*
    La ruta es:
    {{url}}/api/categorias
*/


//Obtener todas las categorias 
router.get('/', obtenerCategorias);

//Obtener una categoria por ID
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria);

//Crear una categoria 
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar una categoria 
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], actualizarCategoria);

//Borrar una categoria - Privado - Solo ADMIN
//id de mongo
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    //custom validator
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], borrarCategoria);

module.exports = router;