const cityDatamapper = require("../datamappers/city");

const resolvers = {
    city:(parent)=>{
        return cityDatamapper.findByPk(parent.city_id);
    }
};

module.exports = resolvers;
