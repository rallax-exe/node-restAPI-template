const { Router } = require('express');
const { buscar } = require('../controllers/buscar');
const router =  Router();

/*

    Este controlador permite realizar busquedas
    primer se recibe la coleccion y el termino
    a buscar

*/

router.get('/:coleccion/:termino', buscar)





module.exports = router;
