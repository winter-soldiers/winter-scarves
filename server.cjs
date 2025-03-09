const { createScarves, getAllScarves } = require('./db/scarves.cjs');
const express = require('express');
const app = express();
const client = require('./db/client.cjs');

//middleware
app.use(express.json());

//routes
app.get('/', async (req, res) => {
  res.send('WELCOME TO THE SCARF API');
});

app.get('/api/v1/scarves', async (req, res) => {
  try {
    const scarves = await getAllScarves();  
    console.log('All scarves:', scarves);
    res.status(200).json(scarves);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get scarves" });
  }
});


// POST route to create a new scarf
app.post('/api/v1/scarves', async (req, res) => {
    try {
        const { name, description, price, color, material } = req.body;
        console.log('Request body:', req.body);
        const newScarf = await createScarves(name, description, price, color, material);
        console.log('New scarf:', newScarf);
        res.status(201).json(newScarf);
    } catch(err) {
        console.error('Error:', err);
        res.status(500).json({ error: "Failed to create scarf" });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  