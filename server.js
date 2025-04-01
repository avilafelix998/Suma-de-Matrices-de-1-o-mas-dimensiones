// server
import express from 'express';
const app = express()
app.use(express)
const port = 8000;


// middleware para parsear el cuerpo de las solicitudes como json

app.use(express.json())

// ruta para manejar la suma de matrices

app.post('/sumar_matrices', (req, res) => {

    const {matriz1, matriz2} = req.body

    //verificar si ambas matrices tienen la misma dimesión

if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length){return res.status(400).json({error: "las matrices deben tener las mismas dimensiones"})}
    

//sumar las matrices 

const resultado = matriz1.map( (fila, i) =>
fila.map((valor,j) => valor + matriz2[i][j])    
);

//para enviar el resultado

res.json( {resultado} )
})

//iniciar un servidor 

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})