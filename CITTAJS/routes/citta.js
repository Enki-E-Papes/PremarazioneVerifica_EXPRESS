const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Percorso al file JSON
const dataPath = path.join(__dirname, '../citta.json');

// Legge i dati delle squadre
function getCities() {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
}


router.get('/', function(req, res, next) {
    var cities = getCities();
    res.render('index', { title: 'Città europee', cities : cities });
});

// Pagina dettaglio citta
router.get('/:name', (req, res) => {
    const cities = getCities();
    const cittas = cities.find(c => c.name === req.params.name);
    if (!cittas) {
      return res.status(404).send('Citta non trovata');
    }
    res.render('citta', { title: cittas.name, cittas });
  });
  
  module.exports = router;