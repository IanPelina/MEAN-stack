const express = require('express');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express(); // Créer une instance d'Express, cette instance représente l'application

mongoose.connect('mongodb+srv://firstUser:firstPassword@atlascluster.fsqx8g5.mongodb.net/',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Intercèpte toutes les requêtes qui ont pour 'content-type' json (toutes requêtes qui contient du json)
// Et met à disposition leurs body directement sur l'objet req // equivalent de bodyParser
app.use(express.json());

// Gérer l'erreur CORS
app.use((req, res, next) => { // Middleware générale qui s'applique à toutes les requêtes faites au serveur
    // Rendre l'API accessible depuis n'importe quelle origine (port front-end: 4200 // port back-end: 3000)
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajouter les headers mentionnés aux requêtes envoyées vers notre API 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app; // Export de l'instance pour pouvoir l'importer et l'utiliser dans d'autres fichiers de l'application