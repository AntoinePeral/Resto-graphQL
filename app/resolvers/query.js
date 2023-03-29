
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolverQuery = {
    getAllRestaurants (_,__,{dataSources}){
        return dataSources.restoDB.restaurant.findAll();
    },
    getRestaurant (_ , args,{dataSources}){
        return dataSources.restoDB.restaurant.findByPk(args.id);
    },
    getAllCities(_,__,{dataSources}){
        return dataSources.restoDB.city.findAll();
    },
    getCity(_,args,{dataSources}){
        return dataSources.restoDB.city.findByPk(args.id);
    },
    getAllManagers(_,__,{dataSources}){
        return dataSources.restoDB.manager.findAll();
    },
    getManager(_, args, { dataSources }) {
        return dataSources.restoDB.manager.findByPk(args.id);
    },
    getCitation(_,__,{dataSources}){
        return dataSources.kaamelottAPI.getCitation();
    },
    getAllCookingStyles(_, __, { dataSources }) {
        return dataSources.restoDB.cookingStyle.findAll();
    },

    getCookingStyle(_, args, { dataSources }) {
        return dataSources.restoDB.cookingStyle.findByPk(args.id);
    }
};

module.exports = resolverQuery;
