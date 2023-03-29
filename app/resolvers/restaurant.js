const resolvers = {
    city(parent,_,{dataSources}){
        return dataSources.restoDB.city.findByPk(parent.city_id);
    },
    manager(parent,_,{dataSources}){
        return dataSources.restoDB.manager.findByPk(parent.manager_id);
    }
};

module.exports = resolvers;
