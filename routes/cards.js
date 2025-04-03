const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const cardsPath = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  fs.readFile(cardsPath, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error del servidor' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

module.exports = router;
