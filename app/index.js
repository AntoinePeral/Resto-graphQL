const path = require("path");

// Configuration d'Express
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname,"../public")));

// Configuration d'Apollo
const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

const apolloConfig = {
    typeDefs,
    resolvers
};

module.exports = {
    app,
    apolloConfig
};
