
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolverQuery = {
    getAllRestaurants (_,__,{dataSources}){
        return dataSources.restoDB.restaurant.findAll();
    },
    getRestaurantById (_ , args,{dataSources}){
        return dataSources.restoDB.restaurant.findByPk(args.id);
    },
    getAllCities(_,__,{dataSources}){
        return dataSources.restoDB.city.findAll();
    },
    getCityById(_,args,{dataSources}){
        return dataSources.restoDB.city.findByPk(args.id);
    },
    getAllManagers(_,__,{dataSources}){
        return dataSources.restoDB.manager.findAll();
    },
    getCitation(_,__,{dataSources}){
        return dataSources.kaamelottAPI.getCitation();
    }
};

module.exports = resolverQuery;
