const restaurantDatamapper = require("../datamappers/restaurant");

module.exports = {
    restaurants(city){
        return restaurantDatamapper.findByCity(city.id);
    }
}
