const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const Nasa_api = process.env.NASA_API_KEY;

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener los datos de la API de NASA
app.get('/api/apod', async (req, res) => {
    const { date } = req.query;

    try {
        const ruta = `https://api.nasa.gov/planetary/apod?api_key=${Nasa_api}${date ? `&date=${date}` : ''}`;
        const response = await axios.get(ruta);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de la API de NASA' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
