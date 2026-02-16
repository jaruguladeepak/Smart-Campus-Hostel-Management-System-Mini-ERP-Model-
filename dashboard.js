function loadDashboard() {
    const bookings = loadBookings();

    // Basic Stats
    const accepted = bookings.filter(b => b.status === 'Accepted').length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    const rejected = bookings.filter(b => b.status === 'Rejected').length;
    const available = TOTAL_CAPACITY - accepted;

    document.getElementById("totalRooms").innerText = TOTAL_CAPACITY;
    document.getElementById("occupiedRooms").innerText = accepted;
    document.getElementById("availableRooms").innerText = available;

    const revenue = bookings.reduce((sum, b) => sum + (b.payment?.amount || 0), 0);
    document.getElementById("totalRevenue").innerText = "₹" + revenue.toLocaleString();

    // Chart 1: Booking Status (Doughnut)
    const ctxStatus = document.getElementById('statusChart').getContext('2d');
    new Chart(ctxStatus, {
        type: 'doughnut',
        data: {
            labels: ['Accepted', 'Pending', 'Rejected'],
            datasets: [{
                data: [accepted, pending, rejected],
                backgroundColor: ['#2ecc71', '#f1c40f', '#e74c3c'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // Chart 2: Occupancy (Bar)
    const ctxOccupancy = document.getElementById('occupancyChart').getContext('2d');
    new Chart(ctxOccupancy, {
        type: 'bar',
        data: {
            labels: ['Occupied', 'Available'],
            datasets: [{
                label: 'Rooms',
                data: [accepted, available],
                backgroundColor: ['#3498db', '#95a5a6'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}
