/*
    Verifica en nuestro servidor
    el Token que otorga Google
*/


const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENTE_ID);

async function googleVerify( token = '') {
    //usa el cliente para verificar el token en google
    const ticket = await client.verifyIdToken({
        //Se le manda el token
        idToken: token,
        audience: process.env.GOOGLE_CLIENTE_ID,
        // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const { name, picture, email } = ticket.getPayload();

    return {
        nombre: name, 
        img: picture, 
        correo: email
    }

}


module.exports = {
    googleVerify
}