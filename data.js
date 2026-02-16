// Woxsen Hostel Structure (Modeled from campus info)

const HOSTEL_MODEL = {
    "Hostel Tower": {
        code: "HT",
        blocks: ["A", "B"],
        floors: 10,
        roomsPerFloor: 12
    },
    "Student Hostel": {
        code: "SH",
        blocks: ["A", "B", "C", "D", "E", "F"],
        floors: 6,
        roomsPerFloor: 15
    },
    "Girls Hostel": {
        code: "GH",
        blocks: ["A", "B", "C"],
        floors: 5,
        roomsPerFloor: 14
    }
};

// Calculate Total Capacity Dynamically
const TOTAL_CAPACITY = Object.values(HOSTEL_MODEL).reduce((total, hostel) => {
    return total + (hostel.blocks.length * hostel.floors * hostel.roomsPerFloor);
}, 0);

// Fee structure (per stay – demo values)
const PAYMENT_RULES = {
    "Twin Sharing": 5000,
    "Three Sharing": 3500
};

const AC_CHARGE = {
    "AC": 2000,
    "Non-AC": 0
};

const FOOD_PLANS = {
    "No Food": 0,
    "Breakfast Only": 1500,
    "Breakfast + Lunch": 3000,
    "Full Mess (3 Meals)": 4500
};
