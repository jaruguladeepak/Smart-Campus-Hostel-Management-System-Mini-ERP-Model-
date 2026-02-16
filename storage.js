// Load bookings from localStorage
function loadBookings() {
    const data = localStorage.getItem("bookings");
    return data ? JSON.parse(data) : [];
}

// Save bookings to localStorage
function saveBookings(bookings) {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

// Toast Notification Utility
function showToast(message, type = "info") {
    // Create toast element if not exists
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.innerText = message;
    toast.style.backgroundColor = type === "error" ? "#e74c3c" : "#333";
    toast.className = "show";

    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}
