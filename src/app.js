const express = require('express');
const app = express();
const config = require('./config');
const facebookRoutes = require('./routes/facebookRoutes');
const databaseRoutes = require('./routes/databaseRoutes');

app.use('/api/facebook', facebookRoutes);
// app.use('/api/database', databaseRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
