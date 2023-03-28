const restaurantDatamapper = require("../datamappers/restaurant");

module.exports = {
    restaurants(manager){
        return restaurantDatamapper.findByManager(manager.id);
    }
}
