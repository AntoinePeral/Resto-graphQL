const restaurantDatamapper = require("../datamappers/restaurant");

module.exports = {
    addRestaurant(_,args){
        return restaurantDatamapper.create(args.input);
    }
}
