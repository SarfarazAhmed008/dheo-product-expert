const express = require('express');
const app = express();
const config = require('./config');
const facebookRoutes = require('./routes/facebookRoutes');
const openAIRoutes = require('./routes/openAIRoutes');

app.use('/api/v1/facebook', facebookRoutes);
app.use('/api/v1/openai', openAIRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
