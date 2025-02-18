import express, {json} from 'express';
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViajes,
    guardarTestimonios,
    paginaReservaViajes,
    guardarReservas,
} from "../controllers/paginaController.js";

const router = express.Router();

router.get("/", paginaInicio);
router.get("/nosotros", paginaNosotros);
router.get("/viajes", paginaViajes);
router.get("/testimonios", paginaTestimonios);
router.get("/viajes/:slug", paginaDetalleViajes);
router.get("/reservas", paginaReservaViajes);

router.get("/viajes/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const viaje = await Viaje.findOne({ where: { slug } });

        if (!viaje) {
            return res.redirect("/viajes");
        }

        res.render("viaje", {
            titulo: viaje.titulo,
            resultado: viaje
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/reserva", async (req, res) => {
    const { viaje_id } = req.query;

    if (!viaje_id) {
        return res.redirect("/");
    }

    try {
        const viaje = await Viaje.findByPk(viaje_id);
        if (!viaje) {
            return res.redirect("/");
        }

        res.render("reserva", { viaje }); // Mando el viaje a la vista
    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
});

router.post("/testimonios", guardarTestimonios);
router.post("/reserva", guardarReservas);

export default router;