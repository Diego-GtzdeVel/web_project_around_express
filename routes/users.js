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
      res.status(500).json({ error: 'Error del servidor' });
    }

    const users = JSON.parse(data);

    const user = users.find((u) => u._id === _id);

    if (!user) {
      return res.status(404).json({ error: 'Este usuario no existe' });
    }

    return res.json(user);
  });
});

module.exports = router;
