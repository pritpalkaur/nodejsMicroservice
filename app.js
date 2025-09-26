const express = require('express');
const app = express();

// No need for app.use() here unless configuring middleware

// PostgreSQL connection pool
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test', // Replace with your database name
  password: 'password', // Replace with your password
  port: 5432,
});

// Test connection endpoint
app.get('/test-connection', async (req, res) => {
  try {
    // Attempt a simple query to test the connection
    await pool.query('SELECT 1');
    res.send('Connected to PostgreSQL successfully!');
  } catch (err) {
    console.error('Connection failed:', err);
    res.status(500).send(`Connection failed: ${err.message}`);
  }
});
// Person API to retrieve all person records //authenticateJWT,
// Endpoint to fetch employee data
app.get('/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, salary, hire_date FROM public.employees');
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send(`Error querying database: ${err.message}`);
  }
});
// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;



// app.get('/person', async (req, res) => {
//   try {
//     await sql.connect(config);
//     const result = await sql.query`SELECT * FROM Person`;
//     res.json(result.recordset);
//   } catch (err) {
//     console.error('Error in /person:', err);
//     res.status(500).send(`Error fetching data: ${err.message}`);
//   }
// });
//app.use(express.json());

// app.post('/person', async (req, res) => {
//   const { firstName, lastName, address } = req.body; // Adjust fields based on your Person table
  
//   try {
//     await sql.connect(config);
//     const result = await sql.query`
//       INSERT INTO Person (firstName, lastName, address)
//       VALUES (${firstName}, ${lastName}, ${address})
//     `;
//     res.send('Person record created successfully!');
//   } catch (err) {
//     console.error('Error creating record:', err);
//     res.status(500).send(`Error creating record: ${err.message}`);
//   }
// });

// app.put('/person/:id', async (req, res) => {
//   const { id } = req.params;
//   const { firstName, lastName, address } = req.body;

//   try {
//     await sql.connect(config);
//     const result = await sql.query`
//       UPDATE Person
//       SET firstName = ${firstName},
//           lastName = ${lastName},
//           address = ${address}
//       WHERE id = ${id}
//     `;
//     if (result.rowsAffected[0] > 0) {
//       res.send('Person record updated successfully!');
//     } else {
//       res.status(404).send('Person not found.');
//     }
//   } catch (err) {
//     console.error('Error updating record:', err);
//     res.status(500).send(`Error updating record: ${err.message}`);
//   }
// });

// // // Your GET route
// app.delete('/person/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     await sql.connect(config);
//     const result = await sql.query`
//       DELETE FROM Person WHERE id = ${id}
//     `;
//     if (result.rowsAffected[0] > 0) {
//       res.send('Person record deleted successfully!');
//     } else {
//       res.status(404).send('Person not found.');
//     }
//   } catch (err) {
//     console.error('Error deleting record:', err);
//     res.status(500).send(`Error deleting record: ${err.message}`);
//   }
// });
