Este proyecto es una plataforma web para una agencia de viajes, donde los usuarios pueden explorar diferentes destinos, 
ver los detalles de cada viaje, y realizar reservas. El sistema está basado en Node.js con Express como framework backend, 
Sequelize como ORM para interactuar con la base de datos, y Pug como motor de plantillas para renderizar las vistas.

La web tiene 4 secciones la principal , nosotros , viajes y testimonios.
En la principal se puede ver un resumen de las otras secciones.
En "Nosotros" se encuentra informacion sobre la agencia de viajes.
En "Viajes" tenemos el listado de todos los viajes disponibles pudiendo 
saber más de la informacion del viaje seleccionandolo.
En "testimonios" podemos ver las opiniones de los clientes que han viajado.

La modificacion que he realizado consiste en implementar las reservas del viaje
comenzando al estar en la vista de informacion de un viaje pulsando el
boton de "reservar ahora" nos redirige a un formulario donde nos pide nuestros datos.
