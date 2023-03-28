const express = require('express');

// const app = express();

// // <- indique à express que j'accepte de recevoir un format JSON au travers d'un POST
// app.use(express.json());


const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { expressMiddleware } = require('@apollo/server/express4');

const cors = require('cors')
require("dotenv").config();

// je récupère la configuration Express et la configuration Apollo
const {app,apolloConfig} = require("./app");
const apolloServer = new ApolloServer(apolloConfig);

// Je crèe un serveur HTTP qui écoutera sur le port 3000
const http = require("http");
const serverHTTP = http.createServer(app);
const PORT = process.env.PORT ?? 3000;

// Lancement de mon serveur
(async ()=>{
    // démarrage sur serveur Apollo
    await apolloServer.start();

    // mise en place du serveur Apollo en tant que middleware d'Express
    app.use("/graphql",cors(),express.json(),expressMiddleware(apolloServer));

    // mise en place de l'écoute sur le port 3000
    serverHTTP.listen(PORT,()=>{
        console.log(`Listening on ${PORT}`);
    });

})();

/////////////////////////////////////////////////////////////////////
// Exemple avec un serveur sans Express :

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
// (async ()=>{
//     const { url } = await startStandaloneServer(server, {
//         listen: { port: 4001 },
//     });

//     console.log(`🚀  Server ready at: ${url}`);
// })();
