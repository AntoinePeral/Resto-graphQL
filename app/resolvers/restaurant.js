const resolvers = {
    city(parent,_,{dataSources}){
        return dataSources.cityDatamapper.findByPk(parent.city_id);
    },
    manager(parent,_,{dataSources}){
        return dataSources.managerDatamapper.findByPk(parent.manager_id);
    }
};

module.exports = resolvers;
