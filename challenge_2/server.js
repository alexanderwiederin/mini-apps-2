const express = require('express');
const proxy = require('http-proxy-middleware');
const morgan = require('morgan');
const path = require('path');

const PORT = 3000;

const app = express();
app.use(morgan());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/v1/bpi/historical/close.json', proxy({ target: 'https://api.coindesk.com/', changeOrigin: true }));

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
