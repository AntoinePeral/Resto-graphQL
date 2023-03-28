const { readFileSync }= require("fs");
const path = require("path");
const scalarsSchema = readFileSync(path.join(__dirname,"./Scalars.gql"));
const citySchema = readFileSync(path.join(__dirname,"./City.gql"));
const restaurantSchema = readFileSync(path.join(__dirname,"./Restaurant.gql"));
const citationSchema = readFileSync(path.join(__dirname,"./Citation.gql"));
const managerSchema = readFileSync(path.join(__dirname,"./Manager.gql"));
const meteoSchema = readFileSync(path.join(__dirname,"./Meteo.gql"));
const querySchema = readFileSync(path.join(__dirname,"./Query.gql"));
const mutationSchema = readFileSync(path.join(__dirname,"./Mutation.gql"));

const typeDefs = `#graphql
    ${scalarsSchema}
    ${citySchema}
    ${restaurantSchema}
    ${citationSchema}
    ${managerSchema}
    ${meteoSchema}
    ${querySchema}
    ${mutationSchema}
`;

module.exports = typeDefs;
