const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// === MySQL RDS Connection ===
const db = mysql.createConnection({
  host: 'expadoxcart-database.cniw0eg0giji.us-west-2.rds.amazonaws.com',
  user: 'Admin',
  password: 'Hotsummer1017*',
  database: 'Test_mySQL'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to RDS:', err);
  } else {
    console.log('Connected to RDS MySQL database!');
  }
});

app.get('/api/info', (req, res) => {
  res.json({
    name: "ExpadoxCart",
    description: "A modern ecommerce platform offering seamless shopping experience."
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
