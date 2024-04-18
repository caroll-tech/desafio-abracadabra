import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// carpeta "assets" como carpeta pública del servidor
app.use(express.static('assets'));


// los usuarios validos
const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "María",
  "Ignacia",
  "Javier",
  "Brian"
];


// Middleware para validar si el usuario pasado por parametro existe en el arreglo de usaurios
function userValidate(req, res, next) {

  const user = req.params.usuario;
  if (usuarios.includes(user)) {
     // siguiente 
      next();
  } else {
    // usuario no existe
      res.redirect("/who.jpeg"); 
  }
}

app.get("/abracadabra/conejo/:n", (req, res) => {

  const numeroParametro = req.params.n;
  const numeroAleatorio = Math.floor(Math.random() * (4 - 1)) + 1;

  console.log("numeroAleatorio",numeroAleatorio, "numeroParametro", numeroParametro);
 
   numeroParametro == numeroAleatorio
  ? res.redirect("/conejito.jpg") // verdadero
  : res.redirect("/voldemort.jpg"); // falso
});


// retorna el arreglo con los usuario activos en formato JSON
app.get("/abracadabra/usuarios", (req, res) => {
  res.json({ usuarios: usuarios });
});

app.get('/abracadabra/juego/:usuario', userValidate, (req, res) => {
  res.sendFile(__dirname + '/index.html'); 
});

// cualquier otra ruta se retorn error 404 con página no existe
app.get("*", (req, res) => {
  res.status(404).send("<h1>	&#128048 Esta página no existe... &#128048 </h1>");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
