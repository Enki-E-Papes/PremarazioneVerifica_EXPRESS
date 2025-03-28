const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

/* 🔗 URL del server esterno
const BASE_API_URL = 'https://example.com/api/squadre';

Home - elenco squadre da chiamata HTTP esterna
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(BASE_API_URL);
    const squadre = response.data;
    res.render('index', { title: 'Squadre di Calcio', squadre });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Errore nel recupero dei dati dal server esterno');
  }
});

// Pagina dettaglio squadra - chiamata HTTP esterna
router.get('/squadra/:id', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/${req.params.id}`);
    const squadra = response.data;
    res.render('squadra', { title: squadra.nome, squadra });
  } catch (err) {
    console.error(err.message);
    res.status(404).send('Squadra non trovata');
  }
});
*/

// Percorso al file JSON
const dataPath = path.join(__dirname, '../squadre.json');

// Legge i dati delle squadre
function getSquadre() {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
}

// Home - elenco squadre
router.get('/', (req, res) => {
  const squadre = getSquadre();
  res.render('index', { title: 'Squadre di Calcio', squadre });
});

// Pagina dettaglio squadra
router.get('/squadra/:id', (req, res) => {
  const squadre = getSquadre();
  const squadra = squadre.find(s => s.id === req.params.id);
  if (!squadra) {
    return res.status(404).send('Squadra non trovata');
  }
  res.render('squadra', { title: squadra.nome, squadra });
});

module.exports = router;
