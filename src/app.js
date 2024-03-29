const express = require('express');
const app = express();
const config = require('./config');
const facebookRoutes = require('./routes/facebookRoutes');
const openAIRoutes = require('./routes/openAIRoutes');
const configRoutes = require('./routes/configRoutes');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api/v1/facebook', facebookRoutes);
app.use('/api/v1/openai', openAIRoutes);
app.use('/api/v1/setup', configRoutes);
app.use('/', function(req, res) {
  try {
    res.status(200).json({ message: 'Welcome to Dheo Product Expert' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
