import {Viaje} from "../models/viaje.js";
import moment from 'moment';
import {Testimonial} from "../models/testimoniales.js";
import {Reserva} from "../models/reserva.js";


const paginaInicio = async (req, res) => {

   const promiseDB=[];

    promiseDB.push(Viaje.findAll({limit: 3}));

    promiseDB.push(Testimonial.findAll({
        limit: 3,
        order: [["Id", "DESC"]],
    }));

    //Consultar 3 viajes del modelo de Viaje
    try{
        const resultado = await Promise.all(promiseDB);


        res.render('inicio', {
            titulo: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1],
            moment: moment,
        });

    }catch(err){
        console.log(err);
    }


}

const paginaNosotros = (req, res) => {
    const titulo = 'Nosotros';
    res.render('nosotros', {
        titulo,
    });
};

const paginaViajes = async (req, res) => {
    const titulo = 'Viajes';
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        titulo,
        viajes,
    });
};

const paginaTestimonios = async (req, res) => {
    const testimonios = await Testimonial.findAll({
        limit: 6,
        order: [["Id", "DESC"]],
    });
    res.render('testimonios', {
        pagina:'testimonios',
        testimonios: testimonios,
    });
};

const paginaDetalleViajes = async (req, res) => {
    const{slug} = req.params;

    try{
        const resultado = await Viaje.findOne({where:{slug:slug}});

        res.render('viaje', {
            titulo: "Informacion del Viaje",
            resultado,
            moment:moment,
        });

    }catch(err){
        console.log(err);
    }
};

const paginaReservaViajes = async (req, res) => {
    // Capturar viaje_id desde la URL
    const { viaje_id } = req.query;


    try {
        // Buscar el viaje en la base de datos usando el ID
        const viaje = await Viaje.findByPk(viaje_id);


        // Renderizar la vista de reservas con los datos del viaje
        res.render("reservas", {
            titulo: "Reserva tu Viaje",
            viaje,  // Enviar los datos del viaje a la vista
        });

    } catch (error) {
        console.error("Error al obtener los detalles del viaje:", error);
        res.status(500).send("Error interno del servidor");
    }
};


const guardarReservas = async (req, res) => {
    const { nombre, email, fecha, viaje_id } = req.body;

    const errores = [];

    // Validamos solo los campos necesarios
    if (!nombre.trim()) errores.push({ mensaje: "El nombre está vacío" });
    if (!email.trim()) errores.push({ mensaje: "El email está vacío" });
    if (!fecha.trim()) errores.push({ mensaje: "La fecha está vacía" });

    if (errores.length > 0) {
        // Si hay errores, obtenemos el viaje y renderizamos la vista de nuevo con los errores
        const viaje = await Viaje.findByPk(viaje_id);
        return res.render("reservas", {
            titulo: "Reserva tu Viaje",
            errores,
            nombre,
            email,
            fecha,
            viaje,
        });
    }

    try {
        // Buscamos el viaje sin hacer validación de viaje_id
        const viaje = await Viaje.findByPk(viaje_id);


        // Creamos la reserva con los datos
        await Reserva.create({
            nombre,
            email,
            fecha,
            viaje_id,
            titulo: viaje.titulo,
            precio: viaje.precio,
        });

        // Redirigimos a la página de reservas o confirmación
        res.redirect("/reservas"); // O usa "/reservas/confirmacion" si lo prefieres
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al procesar la reserva");
    }
};


const guardarTestimonios = async (req, res) => {
    console.log(req.body);
    const{nombre, correo, mensaje}=req.body;

    const errores= [];

    if(nombre.trim()===''){
        errores.push({mensaje: 'El nombre está vacio'});
    }

    if(correo.trim()===''){
        errores.push({mensaje: 'El correo esta vacio'});
    }

    if(mensaje.trim()===''){
        errores.push({mensaje: 'El mensaje esta vacio'});
    }

    if(errores.length>0){
        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["Id", "DESC"]],
        });
        res.render('Testimonios', {
            titulo: 'Testimonios',
            errores: errores,
            nombre: nombre,
            correoelectronico: correo,
            mensaje: mensaje,
            testimonios:testimonios
        })
    } else{
        try{
            await Testimonial.create({nombre: nombre, correoelectronico: correo,mensaje: mensaje,});
            res.redirect('/testimonios'); //Guardo en la base de datos y lo envío a la misma vista
        }catch(error){
            console.log(error);
        }
    }
};


export {
    paginaInicio,
    paginaViajes,
    paginaTestimonios,
    paginaNosotros,
    paginaDetalleViajes,
    guardarTestimonios,
    paginaReservaViajes,
    guardarReservas,
}
