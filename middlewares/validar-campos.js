const { validationResult } = require('express-validator');

/*CUSTOM MIDDLEWARE PARA RECIBIR LOS ERRORES DE LA VALIDACION DE LA REQ*/

const validarCampos = ( req, res, next ) => {

    /*Verifica los errores del middleware que valida la informacion de la req*/
    const errors = validationResult(req);

    //Si hay errores
    if ( !errors.isEmpty() ){
        //Detiene el controlador y regresa mensaje de error
        return res.status(400).json(errors);
    };

    /*
        Si no tiene errores la validacion 
        continua con el siguiente middleware
        si ya no hay otro, entonces pasa
        con el controlador
    */
    next();

};


module.exports = {
    validarCampos
};