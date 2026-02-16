#  Smart Hostel Booking System

A premium, frontend-based hostel management solution designed for seamless student accommodation booking and administrative control. Built entirely with vanilla **HTML, CSS, and JavaScript**, this project is lightweight, responsive, and ready for deployment on **GitHub Pages**.

![Booking Dashboard Preview](https://i.postimg.cc/zDV4Hyc9/image.png)

##  Key Features

###  User Portal (`index.html` → `user_booking.html`)
- **Interactive Campus Map**: Integrated Woxsen University map for easy hostel location.
- **Smart Booking Form**: Responsive grid layout with visual icons for intuitive data entry.
- **Dynamic Room Allocation**: Automatically generates room numbers based on Hostel Type and Block selection.
- **Booking Confirmation**: Instant popup modal with unique Booking ID upon successful payment simulation.
- **Status Tracking**: Check real-time booking status using the unique Booking ID.

###  Admin Panel (`admin_panel.html`)
- **Dashboard Analytics**: Visual charts for occupancy rates, booking status, and revenue (simulated).
- **Request Management**: Approve or Reject booking requests with a single click.
- **Room Management**: View total capacity and current occupancy stats.

##  Technology Stack
- **Frontend**: HTML5, CSS3 (Custom Properties & Grid/Flexbox), JavaScript (ES6+)
- **Storage**: `localStorage` (No backend database required - data persists in browser)
- **Icons**: FontAwesome 6.5
- **Fonts**: Google Fonts (Inter & Poppins)
- **Charts**: Chart.js

##  Recent Enhancements (v2.0)
- **UI Overhaul**: Transformed into a premium, glassmorphic design theme with royal blue & green accents.
- **Mobile First**: Fully responsive layouts including a smart collapsible sidebar and stacked forms.
- **Performance**: Optimized animations (reduced tilt effects) for smoother interactions on all devices.
- **UX Improvements**: 
  - Converted booking alerts to professional **Modal Popups**.
  - Added **Copy to Clipboard** functionality for Booking IDs.
  - Implemented **Input Validation** and visual feedback.

##  How to Run

### Option 1: GitHub Pages (Recommended)
1. Fork this repository.
2. Go to **Settings** > **Pages**.
3. Select `main` branch and `/ (root)` folder.
4. Your site will be live instantly!

### Option 2: Local Deployment
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smart-hostel-booking-system.git
   ```
2. Open `index.html` in your browser.

##  Credentials
To access the Admin Panel:
- **URL**: `admin_login.html`
- **User ID**: `admin`
- **Password**: `1234`

##  Project Structure
- `index.html`: Main entry point (Login/Portal).
- `user_booking.html`: Core booking interface.
- `dashboard.html`: Analytics dashboard.
- `admin_panel.html`: Management interface.
- `storage.js`: Handles all data persistence logic.
- `data.js`: Contains static data and configurations.
- `style.css`: Global styles and responsive definitions.

---
*Note: This project uses LocalStorage for data persistence. Clearing your browser cache will reset all data.*
