var express = require('express');
var router = express.Router();
// copia
const fs = require('fs');
const path = require('path');

// Percorso al file JSON
const dataPath = path.join(__dirname, '../citta.json');

// Legge i dati delle squadre
function getCities() {
  const jsonData = fs.readFileSync(dataPath); // Legge i dati delle squadre
  return JSON.parse(jsonData);  // restituisce
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
