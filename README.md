# Plataforma Web - Agencia de Viajes  

Este proyecto es una plataforma web para una agencia de viajes, donde los usuarios pueden explorar diferentes destinos, ver los detalles de cada viaje y hacer reservas.  

El sistema está hecho con **Node.js**, usando **Express** como framework backend, **Sequelize** para manejar la base de datos y **Pug** como motor de plantillas para las vistas.  

## 📌 Secciones de la web  

La web tiene 4 secciones principales:  

- **🏠 Principal**: Un resumen de las otras secciones.  
- **📖 Nosotros**: Info sobre la agencia de viajes.  
- **✈️ Viajes**: Lista de todos los viajes disponibles, con opción de ver más detalles de cada uno.  
- **💬 Testimonios**: Opiniones de clientes que ya han viajado.  

## ✍️ Implementación de reservas  

La modificación que hice fue agregar la opción de hacer reservas.  

Cuando estás en la vista de información de un viaje y le das al botón **"Reservar ahora"**, te lleva a un formulario donde te pide los siguientes datos:  

- **📝 Nombre**  
- **📧 Email**  
- **📅 Fecha de la reserva**  

También, a través de **Sequelize**, se obtiene automáticamente el **título del viaje** y el **precio** desde la base de datos.  

Una vez llenado el formulario, la info se guarda en la tabla **reservas**, para que la agencia pueda revisarlas y gestionarlas.  
