const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');

// Configurar body-parser para manejar datos JSON
app.use(bodyParser.json());

// Configurar conexión a MySQL


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'quiopro123',
  database: 'Parking_db'
});

connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Ruta para registrar ingreso
app.post('/registerEntry', (req, res) => {
    const { vehicleType, plateNumber } = req.body;
    const sql = 'INSERT INTO parking (placa, horaIn, tipoDeVehiculo) VALUES (?, NOW(), ?)';
    db.query(sql, [plateNumber, vehicleType], (err, result) => {
        if (err) {
            console.error('Error al registrar ingreso:', err);
            res.status(500).send('Error al registrar ingreso');
            return;
        }
        res.send('Ingreso registrado con éxito');
    });
});
// Ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
  });