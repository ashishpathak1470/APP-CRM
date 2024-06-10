const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Mock API for Message');
});

app.post('/send', (req, res) => {
  const { message, customerId } = req.body;
  console.log(`Message sent to ${customerId}: ${message}`);

  res.status(200).json({ status: 'success', message: 'Message sent successfully' });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
