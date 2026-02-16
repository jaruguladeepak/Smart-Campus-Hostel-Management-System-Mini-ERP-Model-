let currentBookingPayload = null; // Temp store for booking data before payment

function submitBooking() {
    const name = document.getElementById("name").value.trim();
    const hostelType = document.getElementById("hostelType").value;
    const block = document.getElementById("block").value;
    const roomType = document.getElementById("roomType").value;
    const acType = document.getElementById("acType").value;
    const foodPlan = document.getElementById("foodPlan").value;
    const checkinTime = document.getElementById("checkinTime").value;
    const checkoutTime = document.getElementById("checkoutTime").value;

    if (name === "") {
        showToast("Please enter your name", "error");
        return;
    }
    if (checkinTime === "" || checkoutTime === "") {
        showToast("Please select Check-in/Check-out times", "error");
        return;
    }

    // Calculate Fee
    const baseAmount = PAYMENT_RULES[roomType] || 0;
    const acAmount = AC_CHARGE[acType] || 0;
    const foodAmount = FOOD_PLANS[foodPlan] || 0;
    const totalAmount = baseAmount + acAmount + foodAmount;

    // Generate Room Number based on Woxsen Logic
    const roomNo = generateRoomNumber(hostelType, block);

    // Store payload temporarily
    currentBookingPayload = {
        bookingId: "B" + Date.now(),
        userName: name,
        hostelType: hostelType,
        block: block,
        roomType: roomType,
        acType: acType,
        roomNo: roomNo,
        food: {
            plan: foodPlan,
            amount: foodAmount,
            access: "Inactive" // Activates only after Admin accepts
        },
        checkinTime: checkinTime,
        checkoutTime: checkoutTime,
        status: "Pending",
        totalAmount: totalAmount
    };

    openPayment(totalAmount);
}

function openPayment(amount) {
    document.getElementById("payAmount").innerText = amount;
    document.getElementById("paymentModal").classList.remove("hidden");
}

function closePayment() {
    document.getElementById("paymentModal").classList.add("hidden");
}

function confirmPayment() {
    if (!currentBookingPayload) return;

    const mode = document.querySelector('input[name="payMode"]:checked').value;
    const transactionId = "TXN" + Date.now() + Math.floor(Math.random() * 100);

    // Add Payment Details to Booking
    currentBookingPayload.payment = {
        amount: currentBookingPayload.totalAmount,
        status: "Paid",
        mode: mode,
        transactionId: transactionId,
        paidAt: new Date().toLocaleString()
    };

    // Save Final Booking
    let bookings = loadBookings();
    bookings.push(currentBookingPayload);
    saveBookings(bookings);

    // Success UI
    closePayment();
    showToast(`Payment Successful! TXN: ${transactionId}`, "success");

    // Show Result Modal
    document.getElementById("bookingResultModal").classList.remove("hidden");
    document.getElementById("bookingIdField").value = currentBookingPayload.bookingId;
    document.getElementById("bookingForm").reset();

    currentBookingPayload = null; // Clear temp
}

function copyBookingId() {
    const field = document.getElementById("bookingIdField");
    field.select();
    field.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(field.value);
    showToast("Booking ID copied to clipboard!", "success");
}

function closeBookingResult() {
    document.getElementById("bookingResultModal").classList.add("hidden");
}
