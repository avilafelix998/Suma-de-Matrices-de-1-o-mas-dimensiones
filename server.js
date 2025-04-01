import express from 'express';
import path from 'path'; // Necesario para manipular las rutas de archivos
import { fileURLToPath } from 'url'; // Necesario para convertir la URL en una ruta

const app = express();
const port = 8000;

// Obtener la ruta del directorio donde está el archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos como HTML, CSS y JS desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta para manejar la suma de matrices
app.post('/sumar_matrices', (req, res) => {
    const { matriz1, matriz2 } = req.body;

    // Verificar si ambas matrices tienen la misma dimensión
    if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
        return res.status(400).json({ error: "Las matrices deben tener las mismas dimensiones" });
    }

    // Sumar las matrices
    const resultado = matriz1.map((fila, i) =>
        fila.map((valor, j) => valor + matriz2[i][j])
    );

    // Enviar el resultado
    res.json({ resultado });
});

// Ruta para servir el archivo HTML (cuando accedes a '/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Asegúrate de tener tu HTML en la carpeta 'public'
});

// Iniciar un servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
