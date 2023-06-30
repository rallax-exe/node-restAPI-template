const Role = require('../models/rol');
const {Usuario, Categoria, Producto } = require('../models');

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

const existeCategoriaPorId = async( id = '' ) => {

    /*verificar la categoria existe*/
    //En base de datos busca la categoria que se recibe en la req
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        //Error personalizado 
        throw new Error(`El ID: ${id} no existe`);
    };

};

const existeProductoPorId = async( id = '' ) => {

    /*verificar si el producto existe*/
    //En base de datos busca el producto que se recibe en la req
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        //Error personalizado 
        throw new Error(`El ID: ${id} no existe`);
    };

};

module.exports = {

    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId

};



