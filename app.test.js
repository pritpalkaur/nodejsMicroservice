const request = require('supertest');
const app = require('./app'); // assuming you export app in app.js

// Export your app in app.js for testing
// Modify your app.js to export the app at the end
// Example modification in app.js:
// module.exports = app;

describe('Testing Express App Endpoints', () => {
  test('GET /test-connection should return success message', async () => {
    const response = await request(app).get('/test-connection');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Connected to PostgreSQL successfully!');
  });

  test('GET /employees should return array', async () => {
    const response = await request(app).get('/employees');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
