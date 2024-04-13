const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => {
    // Supprime la clé '_id' du corps de la demande
    delete req.body._id;
    // Crée un nouvel objet 'Thing' en utilisant les données du corps de la demande
    const thing = new Thing({
      ...req.body
    });
    // Enregistre l'objet dans la base de données
    thing.save()
      // Envoie une réponse avec un code de statut 201 et un message JSON si l'enregistrement est réussi
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      // Envoie une réponse avec un code de statut 400 et l'erreur rencontrée si l'enregistrement échoue
      .catch(error => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllThings = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
};