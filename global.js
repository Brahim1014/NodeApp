//Methode also die 3000ms.. es wird diee console erst nach dieser Zeit ausgegeben.
console.log(global);
global.setTimeout(() => {
    console.log("In the Time out");
    //ClearIntervall stoppt die Kontinuerliche Ausgabe der Methode setIntervall
    clearInterval(int);

}, 3000);
//Jetzt Die Methode SetIntervall
//Hier wird die Methode jede (in Intervall bestimmte Zeit)aufgerufen

const int = setInterval(() => {
    console.log("In The Intervall");
}, 1000);
console.log(__dirname);
console.log(__filename);