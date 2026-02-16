function generateRoomNumber(hostelType, block) {
    const hostel = HOSTEL_MODEL[hostelType];
    if (!hostel) return "NA";

    const floor = Math.floor(Math.random() * hostel.floors) + 1;
    const room = Math.floor(Math.random() * hostel.roomsPerFloor) + 1;

    // Format: CODE-BLOCK-FLOOR+ROOM (e.g., HT-A-203)
    return `${hostel.code}-${block}-${floor}${room.toString().padStart(2, "0")}`;
}
