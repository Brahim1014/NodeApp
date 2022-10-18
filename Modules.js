//Importing People KLasse in Modules Klasse.
//Wir können aber die Variablen von People nciht hier in Klasse Modules aufrufen.
//Kein Zugriff
//const xyz = require('./People');
//console.log(xyz);
//console.log(xyz.peo, xyz.ages);
//machen wir es einfacher und sauberer.
const { peo, ages } = require('./People');
console.log(peo, ages);
const os = require('os');
console.log(os.platform(), os.homedir());
