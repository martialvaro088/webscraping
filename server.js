const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/productos', (req, res) => {
    fs.readFile('productos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        const jsonData = JSON.parse(data);
        const productos = jsonData;

        res.json(productos);
    });
});

// Ruta para obtener el feed RSS
app.get('/rss', async (req, res) => {
    const RSS_URL = "https://www.bbc.com/mundo/ultimas_noticias/index.xml";

    try {
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
        const response = await fetch(RSS_URL);
        const data = await response.text();
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al obtener el RSS');
    }
});

app.listen(port, () => {
    console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});