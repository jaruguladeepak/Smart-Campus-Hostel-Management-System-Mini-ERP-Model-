function logout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "admin_login.html";
}

function loadAdminBookings() {
    let bookings = loadBookings();
    const tableBody = document.getElementById("bookingTable");
    tableBody.innerHTML = "";

    bookings.forEach(b => {
        const row = document.createElement("tr");

        let actionButtons = "";
        if (b.status === 'Pending') {
            actionButtons = `
            <button onclick="updateStatus('${b.bookingId}', 'Accepted')" style="background-color:#27ae60; margin-bottom:5px;">Accept</button>
            <button onclick="updateStatus('${b.bookingId}', 'Rejected')" style="background-color:#c0392b;">Reject</button>
        `;
        } else if (b.status === 'Accepted') {
            actionButtons = `<span style="color:green; font-weight:bold;"><i class="fas fa-check"></i> Done</span>`;
        } else {
            actionButtons = `<span class="badge ${b.status.toLowerCase()}">${b.status}</span>`;
        }

        row.innerHTML = `
      <td>${b.bookingId}</td>
      <td>${b.userName}</td>
      <td>${b.hostelType || '-'}</td>
      <td>${b.block || '-'}</td>
      <td><strong>${b.roomNo || 'Pending'}</strong></td>
      <td>${b.roomType}</td>
      <td>${b.acType || '-'}</td>
      <td style="font-size:11px;">
        In: ${b.checkinTime ? new Date(b.checkinTime).toLocaleDateString() : '-'}<br>
        Out: ${b.checkoutTime ? new Date(b.checkoutTime).toLocaleDateString() : '-'}
      </td>
      <td><strong>₹${b.payment?.amount || 0}</strong></td>
      <td>
        <span class="badge ${b.payment?.status === 'Paid' ? 'accepted' : 'rejected'}" style="font-size:10px;">
            ${b.payment?.status || "Unpaid"}
        </span>
      </td>
      <td>${b.food?.plan || "None"}</td>
      <td>
        <span class="badge ${b.food?.access === 'Active' ? 'accepted' : 'pending'}" style="font-size:10px;">
            ${b.food?.access || "Inactive"}
        </span>
      </td>
      <td style="font-size:11px; font-family:monospace;">${b.payment?.transactionId || "-"}</td>
      <td><span class="badge ${b.status.toLowerCase()}">${b.status}</span></td>
      <td>${actionButtons}</td>
    `;

        tableBody.appendChild(row);
    });

    updateDashboardStats(bookings);
}

function updateStatus(bookingId, action) {
    let bookings = loadBookings();
    const index = bookings.findIndex(b => b.bookingId === bookingId);

    if (index === -1) return;

    const booking = bookings[index];
    booking.status = action;

    if (action === "Accepted") {
        booking.food.access = "Active";
        showToast(`Booking Accepted & Food QR Generated`, "success");
    } else if (action === "Rejected") {
        if (booking.payment?.status === "Paid") {
            booking.payment.status = "Refunded";
            booking.payment.refundTransactionId = "RFD" + Date.now();
            booking.payment.refundedAt = new Date().toLocaleString();
            showToast("Booking Rejected & Refund Processed", "info");
        } else {
            showToast("Booking Rejected", "error");
        }
    }

    bookings[index] = booking;
    saveBookings(bookings);
    loadAdminBookings();
}

function updateDashboardStats(bookings) {
    const accepted = bookings.filter(b => b.status === "Accepted").length;
    const pending = bookings.filter(b => b.status === "Pending").length;
    const rejected = bookings.filter(b => b.status === "Rejected").length;

    document.getElementById("acceptedCount").innerText = accepted;
    document.getElementById("pendingCount").innerText = pending;
    document.getElementById("rejectedCount").innerText = rejected;
    document.getElementById("totalCount").innerText = bookings.length;

    // UPDATE CHARTS
    if (window.statusChartInstance) window.statusChartInstance.destroy();

    const ctxStatus = document.getElementById("statusChart").getContext('2d');
    window.statusChartInstance = new Chart(ctxStatus, {
        type: "doughnut",
        data: {
            labels: ["Accepted", "Pending", "Rejected"],
            datasets: [{
                data: [accepted, pending, rejected],
                backgroundColor: ["#4caf50", "#fbc02d", "#e53935"]
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    const hostelCounts = {};
    bookings.forEach(b => {
        if (b.hostelType) {
            hostelCounts[b.hostelType] = (hostelCounts[b.hostelType] || 0) + 1;
        }
    });

    if (window.hostelChartInstance) window.hostelChartInstance.destroy();

    const ctxHostel = document.getElementById("hostelChart").getContext('2d');
    window.hostelChartInstance = new Chart(ctxHostel, {
        type: "bar",
        data: {
            labels: Object.keys(hostelCounts),
            datasets: [{
                label: 'Bookings by Hostel',
                data: Object.values(hostelCounts),
                backgroundColor: "#1976d2"
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// Initial Load
window.onload = loadAdminBookings;
