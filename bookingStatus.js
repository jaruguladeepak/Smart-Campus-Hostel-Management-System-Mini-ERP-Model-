function checkBookingStatus() {
    const bookingId = document.getElementById("bookingId").value.trim();

    if (bookingId === "") {
        showToast("Please enter Booking ID", "error");
        return;
    }

    let bookings = loadBookings();
    const booking = bookings.find(b => b.bookingId === bookingId);
    const resultDiv = document.getElementById("result");
    const foodSection = document.getElementById("foodSection");

    if (booking) {
        // 1. Basic & Payment Info (Rendered in Result Div)
        let payStatus = booking.payment?.status || 'Pending';
        let payClass = payStatus === 'Paid' ? 'accepted' : 'rejected';

        if (booking.status === 'Rejected' && booking.payment?.status === 'Paid') {
            payStatus = 'Refunded';
            payClass = 'rejected'; // Red badge for refund
        }

        resultDiv.innerHTML = `
            <div style="text-align:left; margin-top:20px; color:#333;">
                <p><strong>Name:</strong> ${booking.userName}</p>
                <p><strong>Room Type:</strong> ${booking.roomType}</p>
                <p><strong>Status:</strong> <span class="badge ${booking.status.toLowerCase()}">${booking.status}</span></p>
                ${booking.roomNo ? `<p><strong>Assigned Room:</strong> ${booking.roomNo}</p>` : ''}
                <hr style="margin:10px 0; border:0; border-top:1px solid #eee;">
                <p><strong>Total Amount:</strong> ₹${booking.payment?.amount || 0}</p>
                <p><strong>Payment Status:</strong> <span class="badge ${payClass}">${payStatus}</span></p>
            </div>
        `;

        // 2. Refund Message Logic
        if (booking.status === "Rejected") {
            const refundBox = document.getElementById("refundMessage");
            refundBox.innerHTML = `
                <div class="refund-alert">
                  <h3>❌ Booking Rejected</h3>
                  <p>Your booking request has been rejected by the admin.</p>
                  <p><strong>Refund Amount:</strong> ₹${booking.payment?.amount || 0}</p>
                  <p>Your amount has been credited back to your account.</p>
                  <p><strong>Refund ID:</strong> ${booking.payment?.refundTransactionId || "Processing..."}</p>
                  <p><strong>Refund Date:</strong> ${booking.payment?.refundedAt || "-"}</p>
                </div>
            `;
        } else {
            document.getElementById("refundMessage").innerHTML = "";
        }

        // 3. Food QR Logic
        if (booking.status === "Accepted" && booking.food?.access === "Active") {
            foodSection.classList.remove("hidden");
            document.getElementById("foodPlanText").innerText = booking.food.plan;

            const qrData = JSON.stringify({
                id: booking.bookingId,
                name: booking.userName,
                plan: booking.food.plan,
                valid: "YES"
            });

            document.getElementById("qrBox").innerHTML =
                `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrData)}" style="border-radius:10px; border:2px solid #2e7d32;">`;
        } else {
            foodSection.classList.add("hidden");
        }

    } else {
        resultDiv.innerHTML = "<p style='color:red; text-align:center;'>Booking not found!</p>";
        showToast("Booking not found", "error");

        if (foodSection) foodSection.classList.add("hidden");
    }
}
