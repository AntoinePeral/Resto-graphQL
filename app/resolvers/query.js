const restaurantDatamapper = require("../datamappers/restaurant");
const cityDatamapper = require("../datamappers/city");
const managerDatamapper = require("../datamappers/manager");

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolverQuery = {
    getAllRestaurants (){
        return restaurantDatamapper.findAll();
    },
    getRestaurantById (_ , args){
        return restaurantDatamapper.findByPk(args.id);
    },
    getAllCities(){
        return cityDatamapper.findAll();
    },
    getCityById(_,args){
        return cityDatamapper.findByPk(args.id);
    },
    getAllManagers(){
        return managerDatamapper.findAll();
    }
};

module.exports = resolverQuery;
