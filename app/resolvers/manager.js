
module.exports = {
    restaurants(manager,_,{dataSources}){
        return dataSources.restoDB.restaurant.findByManager(manager.id);
    }
}
