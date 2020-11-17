if(process.NODE_ENV !== 'production'){
    require('dotenv').config();
}

// Manipuler les arguments
// function collect(cle) {
//     let key = process.argv.indexOf(cle);

//     return key === -1 ? null : process.argv[key + 1];
// }

// const name = collect('name');
// console.log(name);

const fs = require('fs');


const {exec} = require('child_process');

// Création du .env si lancement index.js après avoir cloné le repos
(function () {

    try {
        const files = fs.readdirSync('./');

        if (! files.includes('.env')) {
            exec('npm install && touch .env');
            fs.writeFileSync('./.env', 'PORT=3000 \nPGDATABASE= \nPGUSER= \nPGPASSWORD=')
            process.stdout.write(`N'oubliez pas de mettre les variables d'environnement à jour dans le fichier .env\n`)
        }
    }
    catch (err){
        console.error(err);
    }

    
})();




const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

const session = require('cookie-session');
app.use(session({
    secret: "super mot de passe long et chiant", // le "secret" qui sert à générer des id de sessions chiffrés
    resave: true, // sauvegarde les session à chaque appel, meme si elle n'a pas changé
    saveUninitialized: true, // sauvegarde une session, même si elle est vide
    cookie : { // les options du cookie
      secure: false, // sans ça, on es obligé de passer en httpS (et c'est pas simple...)
      maxAge: (1000*60*60) // le temps maximum de vie de la session (en ms) => une heure
    }
}));

const router = require('./app/router');
app.use(router);

app.listen(port,()=> {
    console.log(`server started on port ${port}`)
})

