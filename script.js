const apiUrl = 'http://localhost:3000/api';

async function registerEntry() {
    const vehicleType = document.getElementById('vehicleType').value;
    const plateNumber = document.getElementById('plateNumber').value;
    const entryTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (!plateNumber) {
        alert('Por favor, ingrese el número de placa.');
        return;
    }

    const response = await fetch(`${apiUrl}/register-entry`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plateNumber, vehicleType, entryTime })
    });

    const data = await response.json();
    document.getElementById('entryDetails').innerHTML = `
        Placa: ${data.plateNumber}<br>
        Tipo: ${vehicleType === 'car' ? 'Carro' : 'Moto'}<br>
        Hora de Ingreso: ${entryTime}
    `;
    alert(`Ingreso registrado para ${data.plateNumber}`);
}

async function registerExit() {
    const plateNumber = document.getElementById('plateNumberExit').value;
    const exitTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const response = await fetch(`${apiUrl}/get-vehicle/${plateNumber}`);
    const vehicleData = await response.json();

    if (!vehicleData) {
        alert('Por favor, ingrese el número de placa correcto.');
        return;
    }

    const entryTime = new Date(vehicleData.entry_time).getTime();
    const exitTimeMs = new Date(exitTime).getTime();
    const hoursParked = Math.ceil((exitTimeMs - entryTime) / (1000 * 60 * 60));
    const chargePerHour = vehicleData.vehicle_type === 'car' ? 3200 : 1000;
    const totalCharge = hoursParked * chargePerHour;

    const responseExit = await fetch(`${apiUrl}/register-exit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plateNumber, exitTime, totalCharge })
    });

    const dataExit = await responseExit.json();
    document.getElementById('exitDetails').innerHTML = `
        Placa: ${plateNumber}<br>
        Tipo: ${vehicleData.vehicle_type === 'car' ? 'Carro' : 'Moto'}<br>
        Hora de Entrada: ${vehicleData.entry_time}<br>
        Hora de Salida: ${exitTime}<br>
        Horas Estacionadas: ${hoursParked}<br>
        Costo Total: ${totalCharge} pesos colombianos
    `;
    alert(`Salida registrada para ${plateNumber}. Costo total: ${totalCharge} pesos colombianos.`);
}

