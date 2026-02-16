const ADMIN_ID = "admin";
const ADMIN_PASS = "1234";

function login() {
    const id = document.getElementById("adminId").value;
    const pass = document.getElementById("adminPass").value;

    if (id === ADMIN_ID && pass === ADMIN_PASS) {
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "admin_panel.html";
    } else {
        alert("Invalid credentials");
    }
}
