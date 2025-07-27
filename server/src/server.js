// server/src/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); 
require('dotenv').config();

const app = express();

//mail
const emailRoutes = require('./routes/email');  // adjust path accordingly



app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../../client')));

//mount email
app.use('/api/email', emailRoutes);



app.use('/api/auth',     require('./routes/auth'));
app.use('/api/music',    require('./routes/music'));
app.use('/api/playlist', require('./routes/playlist'));
app.use('/api/diary',    require('./routes/diary'));
app.use('/api/mood',     require('./routes/mood'));
app.use('/api/history',  require('./routes/history'));
app.use('/api/analytics',require('./routes/analytics'));

app.use(require('./middleware/error'));

const PORT = process.env.PORT || 5000;
// app.listen(PORT, ()=>console.log('Server running on port', PORT));
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

