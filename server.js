// Import d'un module de base 
// Node sait qu'il doit importer un module de base quand on ne spécifie pas un chemin relatif 
// (qui commence par  ./  ou  /  , par exemple).
const http = require('http');
const app = require('./app');

// Fonction pour normaliser le port
const normalizePort = val => {
  const port = parseInt(val, 10);
  // Vérifie si le port est un nombre valide
  if (isNaN(port)) {
    return val;
  }
  // Vérifie si le port est un nombre entier positif
  if (port >= 0) {
    return port;
  }
  return false;
};

// Récupère le port à partir des variables d'environnement ou utilise 3000 par défaut
const port = normalizePort(process.env.PORT || '3000');
// Configure le port pour l'application
app.set('port', port);

// Gestionnaire d'erreurs du serveur
const errorHandler = error => {
  // Vérifie le type d'erreur
  if (error.syscall !== 'listen') {
    throw error;
  }
  // Récupère l'adresse du serveur
  const address = server.address();
  // Formatte l'adresse pour l'affichage
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  // Gère différents types d'erreurs
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Crée le serveur HTTP en utilisant l'application
const server = http.createServer(app);
// Gère les erreurs du serveur
server.on('error', errorHandler);
// Affiche un message lorsque le serveur est en écoute sur un port
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Server is listening on ' + bind);
});
// Met le serveur en écoute sur le port spécifié
server.listen(port);
