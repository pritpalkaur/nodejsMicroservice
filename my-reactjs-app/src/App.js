import React, { useState } from 'react';

function App() {
  const [connectionStatus, setConnectionStatus] = useState('');
  const [employees, setEmployees] = useState([]);

  // Function to test the database connection
  const testConnection = () => {
    fetch('http://localhost:3000/test-connection-oracle')
      .then(res => res.text())
      .then(data => setConnectionStatus(data))
      .catch(err => setConnectionStatus('Error connecting to API'));
  };

  // Function to fetch employees data
  const fetchEmployees = () => {
    fetch('http://localhost:3000/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => alert('Error fetching employees'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee Data Dashboard</h1>
      
      <button onClick={testConnection}>Test DB Connection</button>
      <p>Status: {connectionStatus}</p>
      
      <hr />

      <button onClick={fetchEmployees}>Load Employees</button>
      
      {employees.length > 0 && (
        <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Job Title</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.EMPLOYEE_ID}</td>
                <td>{emp.FIRST_NAME}</td>
                <td>{emp.LAST_NAME}</td>
                <td>{emp.JOB_TITLE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

