const express = require('express');
const oracledb = require('oracledb');

const app = express();
const port = 3000;

// Oracle DB configuration
const dbConfig = {
  user: 'sys',               // Oracle username
  password: 'password',      // Oracle password
  connectString: 'localhost/XEPDB1', // Replace with your Oracle connect string
  privilege: oracledb.SYSDBA // Only needed if using 'sys' user
};

// Test connection endpoint
app.get('/test-connection-oracle', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT 1 FROM DUAL');
    res.send('Connected to Oracle DB successfully!');
  } catch (err) {
    console.error('Connection failed:', err);
    res.status(500).send(`Connection failed: ${err.message}`);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error closing connection:', closeErr);
      }
    }
  }
});

// Define a route to fetch data
app.get('/employees', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM EMPLOYEES_SELECTED');
    res.json(result.rows); // Oracle returns rows as array
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error closing connection:', closeErr);
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

