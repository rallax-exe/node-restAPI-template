const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    //Verifica que el rol de la req exista en la base de datos
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        //Error personalizado 
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    };
};


const emailExiste = async( correo = '' ) => {
    /*verificar si el correo existe*/
    //En base de datos busca el correo que se recibe en la req
    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail ) {
        //Error personalizado 
        throw new Error(`El correo ${correo} ya esta registrado`);
    };

};

const existeUsuarioPorId = async( id = '' ) => {
    /*verificar si el correo existe*/
    //En base de datos busca el correo que se recibe en la req
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        //Error personalizado 
        throw new Error(`El ID: ${id} no existe`);
    };

};

module.exports = {

    esRoleValido,
    emailExiste,
    existeUsuarioPorId

};



