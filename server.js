require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoint para crear un Gist con el pedido
app.post('/api/crear-gist-pedido', async (req, res) => {
    try {
        const { nombre, apellidos, telefono, direccion, pedido, total } = req.body;

        // Validación básica
        if (!nombre || !apellidos || !telefono || !direccion || !pedido || !total) {
            return res.status(400).json({ error: 'Faltan datos del pedido' });
        }

        // Construir el contenido del archivo .txt
        const fecha = new Date().toLocaleString('es-ES', { 
            timeZone: 'America/Santiago',
            dateStyle: 'full', 
            timeStyle: 'medium' 
        });
        
        let contenido = `========================================\n`;
        contenido += `PEDIDO REALIZADO\n`;
        contenido += `========================================\n`;
        contenido += `Fecha: ${fecha}\n`;
        contenido += `Cliente: ${nombre} ${apellidos}\n`;
        contenido += `Teléfono: ${telefono}\n`;
        contenido += `Dirección: ${direccion}\n\n`;
        
        contenido += `DETALLE DEL PEDIDO:\n`;
        contenido += `----------------------------------------\n`;
        
        pedido.forEach(item => {
            contenido += `${item.cantidad} x ${item.nombre}\n`;
            contenido += `   Precio unitario: ${item.precio}\n`;
            contenido += `   Subtotal: ${item.subtotal}\n`;
            contenido += `----------------------------------------\n`;
        });
        
        contenido += `\nTOTAL: ${total}\n`;
        contenido += `========================================\n`;

        // Crear el Gist usando la API de GitHub
        const gistData = {
            description: `Pedido de ${nombre} ${apellidos} - ${new Date().toLocaleDateString()}`,
            public: false, // false para privado, true para público
            files: {
                [`pedido_${Date.now()}.txt`]: {
                    content: contenido
                }
            }
        };

        const response = await axios.post('https://api.github.com/gists', gistData, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github+json'
            }
        });

        // Responder con la URL del Gist creado
        res.json({
            success: true,
            message: 'Gist creado exitosamente',
            gistUrl: response.data.html_url,
            gistId: response.data.id
        });

    } catch (error) {
        console.error('Error al crear Gist:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Error al guardar el pedido en GitHub',
            details: error.response?.data || error.message
        });
    }
});

// Endpoint de prueba
app.get('/api/status', (req, res) => {
    res.json({ status: 'Servidor funcionando' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
