const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const scarves = [
    { id: 1, material: "wool", price: 25, color: "red", description: "A warm winter scarf" },
    { id: 2, material: "cotton", price: 15, color: "blue", description: "A light summer scarf" },
    { id: 3, material: "silk", price: 35, color: "green", description: "An elegant evening scarf" },
    { id: 4, material: "cashmere", price: 45, color: "purple", description: "A luxurious winter scarf" },
    { id: 5, material: "linen", price: 55, color: "white", description: "A light and airy summer scarf" },
];

app.get("/api/scarves", (req, res) => {
    res.json(scarves);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost: 5000`);
});