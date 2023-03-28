const { readFileSync }= require("fs");
const path = require("path");
const citySchema = readFileSync(path.join(__dirname,"./City.gql"));
const restaurantSchema = readFileSync(path.join(__dirname,"./Restaurant.gql"));
const managerSchema = readFileSync(path.join(__dirname,"./Manager.gql"));
const querySchema = readFileSync(path.join(__dirname,"./Query.gql"));
const mutationSchema = readFileSync(path.join(__dirname,"./Mutation.gql"));

const typeDefs = `#graphql
    ${citySchema}
    ${restaurantSchema}
    ${managerSchema}
    ${querySchema}
    ${mutationSchema}
`;

module.exports = typeDefs;
