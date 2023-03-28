const cityDatamapper = require("../datamappers/city");
const managerDatamapper = require("../datamappers/manager");

const resolvers = {
    city(parent){
        return cityDatamapper.findByPk(parent.city_id);
    },
    manager(parent){
        return managerDatamapper.findByPk(parent.manager_id);
    }
};

module.exports = resolvers;
