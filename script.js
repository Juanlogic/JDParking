function registerEntry() {
    const vehicleType = document.getElementById('vehicleType').value;
    const plateNumber = document.getElementById('plateNumber').value;

    fetch('http://localhost:3000/registerEntry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vehicleType, plateNumber })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('entryDetails').innerText = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


