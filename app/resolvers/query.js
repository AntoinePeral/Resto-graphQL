const restaurantDatamapper = require("../datamappers/restaurant");
const cityDatamapper = require("../datamappers/city");

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolverQuery = {
    getAllRestaurants (){
        return restaurantDatamapper.findAll();
    },
    getRestaurantById(id){
        return restaurantDatamapper.findByPk(id);
    },
    getAllCities(){
        return cityDatamapper.findAll();
    }
};

module.exports = resolverQuery;
