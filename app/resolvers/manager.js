
module.exports = {
    restaurants(manager,_,{dataSources}){
        return dataSources.restaurantDatamapper.findByManager(manager.id);
    }
}
