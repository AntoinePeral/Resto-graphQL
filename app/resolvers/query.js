
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolverQuery = {
    getAllRestaurants (_,__,{dataSources}){
        return dataSources.restaurantDatamapper.findAll();
    },
    getRestaurantById (_ , args,{dataSources}){
        return dataSources.restaurantDatamapper.findByPk(args.id);
    },
    getAllCities(_,__,{dataSources}){
        return dataSources.cityDatamapper.findAll();
    },
    getCityById(_,args,{dataSources}){
        return dataSources.cityDatamapper.findByPk(args.id);
    },
    getAllManagers(_,__,{dataSources}){
        return dataSources.managerDatamapper.findAll();
    },
    getCitation(_,__,{dataSources}){
        return dataSources.kaamelottAPI.getCitation();
    }
};

module.exports = resolverQuery;
