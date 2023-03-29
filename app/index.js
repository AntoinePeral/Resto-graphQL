const path = require("path");
const debug = require('debug')('knex:stats');
// Configuration d'Express
const express = require("express");
const app = express();

// app.use(express.static(path.join(__dirname,"../public")));
app.use(express.static(path.resolve(__dirname, '../front/build')));

// Configuration d'Apollo
const typeDefs = require("./schemas");
const resolvers = require("./resolvers");
const kaamelottAPI = require("./datasources/kaamelottAPI");
const meteoAPI = require("./datasources/meteoAPI");

// const restaurantDatamapper = require("./datamappers/restaurant");
// const cityDatamapper = require("./datamappers/city");
// const managerDatamapper = require("./datamappers/manager");

const RestoPG = require('./datasources/restoPG');
let queryCount = 0;
const restoDB = new RestoPG({
    client: 'pg',
    connection: {
        host: process.env.PGHOST ?? 'localhost',
        port: process.env.PGPORT ?? 5432,
        user: process.env.PGUSER ?? 'postgres',
        password: process.env.PGPASSWORD ?? null,
        database: process.env.PGDATABASE ?? 'oresto',
    },
    postProcessResponse: (result) => {
        queryCount += 1;
        debug(`query n°${queryCount}`);
        return result;
    },
});

const apolloConfig = {
    typeDefs, // schéma des Types
    resolvers, // resolvers
    context(request,response){ // contexte qui contient les sources de données
        return {
            dataSources:{
                kaamelottAPI: new kaamelottAPI(),
                meteoAPI:new meteoAPI(),
                restoDB
            }
        }
    }
};

module.exports = {
    app,
    apolloConfig
};
