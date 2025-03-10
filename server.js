const express = require('express');
const better = require('better-sqlite3');
const db = better('bodega.db');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));

//configure cors so all origins are allowed
const corsOptions = {
    origin: '*'
    };
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/endpoints', (req, res) => {
  const html = `
    <html>
      <head>
        <title>Bodega API</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <h1>Vinos y Catas</h1>
        <p><a href="/vinos">GET /vinos</a></p>
        <p><a href="/catas">GET /catas</a></p>
      </body>
    </html>`;
  res.send(html);
});

app.get('/vinos', (req, res) => {
  
  const vinos = db.prepare('SELECT nombre, año, tipo, precio FROM vinos').all();
  res.json(vinos);
});


app.get('/catas', (req, res) => {
    const catas = db.prepare('SELECT * FROM catas').all();
    res.json(catas);
});

app.get('/vinos/:id', (req, res) => {
    const vino = db.prepare('SELECT * FROM vinos WHERE id = ?').get(req.params.id);
    res.json(vino);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});