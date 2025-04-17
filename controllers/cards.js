const Card = require('../models/card')

module.exports.getCards = (req, res) => {
    Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: 'Error del servidor', error: err.message }));
};

module.exports.createCard = (req, res) => {
    console.log(req.user.id);
    const { name, link, ownerId } = req.body;
    
    Card.create({ name, link, owner: ownerId })
        .then((card) => res.status(201).send(card))
        .catch((err) => {
        if (err.name === 'ValidationError') {
            return res.status(400).send({ message: 'Datos inválidos al crear la tarjeta', error: err.message });
        }
        res.status(500).send({ message: 'Error del servidor', error: err.message });
        });
};

module.exports.deleteCard = (req, res) => {
    const { cardId } = req.params;
  
    Card.findByIdAndDelete(cardId)
      .then((card) => {
        if (!card) {
          return res.status(404).send({ message: 'Tarjeta no encontrada' });
        }
        res.send({ message: 'Tarjeta eliminada correctamente' });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          return res.status(400).send({ message: 'ID de tarjeta no válido' });
        }
        res.status(500).send({ message: 'Error del servidor', error: err.message });
      });
  };
