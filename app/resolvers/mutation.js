module.exports = {
    addRestaurant(_,args,{dataSources}){
        return dataSources.restoDB.restaurant.create(args.input);
    },
    addManager(_,args,{dataSources}){
        return dataSources.restoDB.restaurant.create(args.input);
    }
}
