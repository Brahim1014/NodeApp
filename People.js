const peo = ["Anna", "Ma3rouf", "Omar", "Ninja"];
const ages = [20, 25, 33, 50];
//console.log(peo);

//module.exports = "Hello";
//Hello wird automatisch den Variable XYZ zugewiesen.
module.exports = peo;
//Jetzt Importing mehrere Daten
//XYZ ist jetzt gleich peo und ages
module.exports = {
peo, ages
};