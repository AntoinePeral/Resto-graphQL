
const debug = require("debug")("resolver:city");
module.exports = {
    restaurants(city,_,{ dataSources }){
        debug(dataSources);
        return dataSources.restoDB.restaurant.findByCity(city.id);
    },
    meteo(city,_,{ dataSources }){
        return dataSources.meteoAPI.getMeteoByGeopos(city.geopos.x,city.geopos.y);
    }
}
