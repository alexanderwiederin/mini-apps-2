const express = require('express');
const proxy = require('http-proxy-middleware');

const PORT = 3000;

const app = express();

app.get('/v1/bpi/historical/close.json', proxy({ target: 'https://api.coindesk.com/', changeOrigin: true }));

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
