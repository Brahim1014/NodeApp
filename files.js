const fs = require('fs'); //fs steht für File Systeme
fs.readFile('./Node-Tutorium/docs.txt', (err, data) => {
    if (err) {
        //console.log(err);
    }
    //   console.log(data.toString());


});
//reading files

//write File

fs.writeFile('./docs1.txt', ' and again', () => { //Wenn der File exist, wird die Angabe Hello again mitgeschrieben, ansonsten wird den File erstellt und die Eingabe reingeschriben
    //Hier haben wir dics1 erstellt, weil es existiert nicht vorher
    console.log("File was written");
});
//Write another String into an existierende File.
fs.writeFile('./docs.txt', "take another one" ,()=>{
   console.log("please take it") ;
});
//How we work with Directories
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets',(err) =>{ //Erstellen einer Ordner
        if(err){
            console.log(err);
        }
     else   console.log("Folder created");
    })
    
}
//Jetzt werde ich die ordner löschen.
fs.rmdir('./assets',(err) =>{
    if (err) {
        console.log("failed to remove Directory")
        
    }
    else console.log("Directory removed");
})
