const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'quiopro123',  // Cambia 'tu_contraseña' por la contraseña de tu base de datos
    port: 3306,  // Puerto MySQL
    database: 'parking_db'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Rutas
app.post('/api/register-entry', (req, res) => {
    const { plateNumber, vehicleType, entryTime } = req.body;
    const query = 'INSERT INTO vehicles (plate_number, vehicle_type, entry_time) VALUES (?, ?, ?)';
    db.query(query, [plateNumber, vehicleType, entryTime], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, plateNumber, vehicleType, entryTime });
    });
});

app.post('/api/register-exit', (req, res) => {
    const { plateNumber, exitTime, totalCharge } = req.body;
    const query = 'UPDATE vehicles SET exit_time = ?, total_charge = ? WHERE plate_number = ?';
    db.query(query, [exitTime, totalCharge, plateNumber], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Salida registrada exitosamente' });
    });
});

app.get('/api/get-vehicle/:plateNumber', (req, res) => {
    const plateNumber = req.params.plateNumber;
    const query = 'SELECT * FROM vehicles WHERE plate_number = ?';
    db.query(query, [plateNumber], (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
