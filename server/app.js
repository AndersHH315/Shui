const express = require('express');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3001;
const connection = require('./Db/connection');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const pages = require('./routes/pages');
const authRoute = require('./routes/index');
const secureRoute = require('./routes/secure');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', authRoute);
app.use('/api', secureRoute);
app.use('/', pages);

connection();

app.listen(port, () => console.log(`Listening to port ${port}`));