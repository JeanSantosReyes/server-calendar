const { response } = require('express');
const Evento = require('../models/Evento');

// Para llenar los datos del usuario, el metodo populate()

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name');

    try {
        res.json({
            ok: true,
            eventos
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }

}

const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    try {
        // Añadir uid del usuario al evento
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            evento: eventoGuardado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }

}

const actualizarEvento = async (req, res = response) => {
    // Obtener id enviado en los parametros
    const eventId = req.params.id;
    // Obtener uid 
    const uid = req.uid;
    try {
        // Buscar evento con el id obtenido 
        const evento = await Evento.findById(eventId);
        // Si el evento no existe por ese ID
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            });
        }
        // Si un usuario no perteneciente al evento quiere editar, prohibirlo
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }
}

const eliminarEvento = async (req, res = response) => {
    // Obtener id enviado en los parametros
    const eventId = req.params.id;
    // Obtener uid 
    const uid = req.uid;
    try {
        // Buscar evento con el id obtenido 
        const evento = await Evento.findById(eventId);
        // Si el evento no existe por ese ID
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            });
        }
        // Si un usuario no perteneciente al evento quiere editar, prohibirlo
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete(eventId);

        res.json({ ok: true });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}