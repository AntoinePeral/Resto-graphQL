const path = require("path");

// Configuration d'Express
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname,"../public")));

// Configuration d'Apollo
const typeDefs = require("./schemas");
const resolvers = require("./resolvers");
const kaamelottAPI = require("./datasources/kaamelottAPI");
const meteoAPI = require("./datasources/meteoAPI");

const restaurantDatamapper = require("./datamappers/restaurant");
const cityDatamapper = require("./datamappers/city");
const managerDatamapper = require("./datamappers/manager");

const apolloConfig = {
    typeDefs, // schéma des Types
    resolvers, // resolvers
    context(request,response){ // contexte qui contient les sources de données
        return {
            dataSources:{
                kaamelottAPI: new kaamelottAPI(),
                meteoAPI:new meteoAPI(),
                restaurantDatamapper,
                cityDatamapper,
                managerDatamapper
            }
        }
    }
};

module.exports = {
    app,
    apolloConfig
};
