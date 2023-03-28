module.exports = {
    addRestaurant(_,args,{dataSources}){
        return dataSources.restaurantDatamapper.create(args.input);
    },
    addManager(_,args,{dataSources}){
        return dataSources.managerDatamapper.create(args.input);
    }
}
