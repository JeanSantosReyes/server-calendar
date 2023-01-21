const { response, request } = require('express');
const bycrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar que el email sea unico
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }
        // Establecer cuerpo del body de la peticion en el Schema
        usuario = Usuario(req.body);
        // Encriptar contraseña / hashear
        const salt = bycrypt.genSaltSync();
        usuario.password = bycrypt.hashSync(password, salt);
        // Guardar en Mongo Atlas
        await usuario.save();
        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        // JSON o respuesta devolvida a la peticion POST
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }

}

const loginUsuario = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar que el email sea unico
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con el email'
            });
        }

        // Confirmar si el password hace match con el password encriptado
        const validPassword = bycrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }
        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        // JSON o respuesta devolvida a la peticion POST - LOGIN
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }
}

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req

    // Generar nuevo token
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}