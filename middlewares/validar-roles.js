const { request, response } = require('express');


const esAdminRole = (req = request, res = response, next) => {

    //La informacion de req viene por referencia entre los middlewares
    if (!req.usuario) {

        return res.status(500).json({
            msg: 'Se intento verificar el role sin validar el token primero '
        });

    };

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {

        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });

    };

    //Si no hay problema, pasa al siguiente middleware
    next();

};

//con el operador rest, crea un arreglo de roles que vienen como prop
const tieneRole = (...roles) => {

    /*
        Retorna una funcion, porque la funcion padre recibe props personalizadas,
        se necesita crear un callback para poder usar el next()
    */

    return (req = request, res = response, next) => {

        //La informacion de req viene por referencia entre los middlewares
        if (!req.usuario) {

            return res.status(500).json({
                msg: 'Se intento verificar el role sin validar el token primero '
            });

        };

        //Si el rol del usuario no esta en el arreglo de roles
        if( !roles.includes( req.usuario.rol ) ){

            return res.status(401).json({

                msg:`El servicio require uno de estos roles ${roles}`

            });

        };

        next();
    }

}


module.exports = {

    esAdminRole,
    tieneRole

}