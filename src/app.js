const express = require('express');
const app = express();
const config = require('./config');
const facebookRoutes = require('./routes/facebookRoutes');
const databaseRoutes = require('./routes/databaseRoutes');

app.use('/facebook', facebookRoutes);
app.use('/database', databaseRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
