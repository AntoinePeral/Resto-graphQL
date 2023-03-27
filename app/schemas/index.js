const { readFileSync }= require("fs");
const path = require("path");
const citySchema = readFileSync(path.join(__dirname,"./City.gql"));
const restaurantSchema = readFileSync(path.join(__dirname,"./Restaurant.gql"));
const querySchema = readFileSync(path.join(__dirname,"./Query.gql"));

const typeDefs = `#graphql
    ${citySchema}
    ${restaurantSchema}
    ${querySchema}
`;

module.exports = typeDefs;
