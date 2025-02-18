import Sequelize from "sequelize";
import db from "../config/db.js";
import { Viaje } from './viaje.js';

export const Reserva = db.define("reserva", {
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precio: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

// Relación: Una reserva pertenece a un viaje
Reserva.belongsTo(Viaje, { foreignKey: 'viaje_id', as: 'viaje' });

// Hook para copiar datos de Viaje antes de crear una reserva
Reserva.beforeCreate(async (reserva) => {
    const viaje = await Viaje.findByPk(reserva.viaje_id);
    if (viaje) {
        reserva.titulo = viaje.titulo;
        reserva.precio = viaje.precio;
    }
});

Reserva.sync({ alter: true }).catch(console.error);
