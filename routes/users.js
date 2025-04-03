const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  fs.readFile(usersPath, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error del servidor' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

router.get('/:_id', (req, res) => {
  const { _id } = req.params;

  fs.readFile(usersPath, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error al leer el archivo de usuarios' });
    }

    const users = JSON.parse(data);

    if (!users[_id]) {
      return res.status(404).json({ error: 'Este usuario no existe' });
    }

    return res.json(users[_id]);
  });
});

module.exports = router;
