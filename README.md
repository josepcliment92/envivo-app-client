# EnVivo

## [¡Descubre la App!](https://envivo-app.netlify.app/)

![App Logo](/src/assets/img/logo.png)

## Description

**NOTE -** EnVivo es una aplicación desarrollada con el Stack MERN por Josep Climent, como parte de su formación en el Bootcamp de Desarrollo Web de Ironhack. EnVivo es la plataforma para los amantes de la música en directo: encuentra toda la información que necesitas sobre festivales de música en España. Consulta precios, artistas, fechas y ubicaciones, deja opiniones y lee las de otros para elegir con acierto y disfrutar de los eventos clave de la escena musical española. 

#### [Client Repo](https://github.com/josepcliment92/envivo-app-client)
#### [Server Repo](https://github.com/josepcliment92/envivo-server)

## Technologies & Libraries used

- HTML
- CSS
- JavaScript
- MongoDB
- Express
- React
- Node.js
- NPM packages: bcrypt, jsonwebtoken, cookie-parser, cors, dotenv, mongoose, morgan
- Vite
- Axios
- Bootstrap
- Cloudinary
- Netlify
- Adaptable

# Client Structure

## User Stories

- **Leer Información** - El usuario puede consultar los detalles de un festival de música: dónde se celebra, en qué fechas, artistas principales, géneros musicales, precio base, si cuenta o no con zona de camping e información extra. También puede consultar las reseñas que otros usuarios han dejado sobre ese evento.
- **Editar Información** - El usuario, con los permisos correspondientes, puede editar las reseñas que previamente ha publicado en la aplicación. Puede modificar todos los campos de la reseña. 
- **Crear información** - El usuario, tras registrarse como tal, puede dejar comentarios y reseñas en cada festival. Estas opiniones se publican en la plataforma y pueden ser leídas por cualquiera que la visite.
- **Borrar Información** - El usuario tiene la posibilidad de borrar solo las reseñas que él mismo ha publicado previamente, si así lo desea.
- **Identificarse como usuarios o odministradores** - A través de las páginas de registro y acceso el usuario puede identificarse y acceder a diferentes permisos. Como "user" puede crear, editar y borrar sus reseñas. Como "admin" puede crear, editar y borrar fichas de festivales, además de borrar cualquier reseña publicada en la platafora (tarea de moderador).
- **Gestión de errores** - Cuando la página a la que el usuario intenta acceder no se carga o no existe, se redirige a una página de error 404 que te invita a volver a la página de Festivales.

## Client Routes

## React Router Routes (React App)
| Path                                       | Page            | Components                                     | Permissions            | Behavior                                |
| ------------------------------------------ | ----------------| ---------------------------------------------- | ---------------------- | --------------------------------------- |
| `/`                                        | Home            |                                                | public                 | Home page                               |
| `/registro`                                | Signup          |                                                | public                 | Formulario de Registro                  |
| `/acceso`                                  | Login           |                                                | public                 | Formulario de Acceso                    |
| `/festivales`                              | Festivales      | CartaFestival                                  | public                 | Mostrar listado de festivales           |
| `/festivales/detalle/:festivalId`          | DetallesFestival| CartaDetalleFestival, CartaReseña, FormReseñas | public                 | Información detalle de un festival      |
| `/festivales/edicion-festival/:festivalId` | EditarFestival  | EditFormFestivales                             | admin only `<IsAdmin>` | Editar la información de un festival    |
| `/festivales/creacion-festival/`           | AñadirFestival  | FormFestivales                                 | admin only `<IsAdmin>` | Crear un nuevo festival                 |
| `/contacto`                                | Contacto        |                                                | public                 | Información sobre el desarrollador      |
| `/quienes-somos`                           | QuienesSomos    |                                                | public                 | Información general sobre la aplicación |
| `/error`                                   | NotFound        |                                                | public                 | Redirigir a página Festivales           |

## Other Components

- Navbar
- Footer
- EditFormReseñas

## Services

- Auth Service
  - auth.signup(user)
  - auth.login(user)
  - auth.login(admin)
  - auth.verify
  
## Context

- auth.context
  
## Links

### Collaborators

[Josep Climent](https://github.com/josepcliment92)

### Project

[Repository Link Client](https://github.com/josepcliment92/envivo-app-client)

[Repository Link Server](https://github.com/josepcliment92/envivo-server)

[Deploy Link](https://envivo-app.netlify.app/)

### Slides

[Slides Link](www.your-slides-url-here.com)
