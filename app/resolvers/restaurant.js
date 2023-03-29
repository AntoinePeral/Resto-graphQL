const resolvers = {
    city(parent,_,{dataSources}){
        return dataSources.restoDB.city.findByPk(parent.city_id);
    },
    manager(parent,_,{dataSources}){
        return dataSources.restoDB.manager.findByPk(parent.manager_id);
    },
    cookingStyles(parent, _, { dataSources }) {
        return dataSources.restoDB.cookingStyle.findByRestaurant(parent.id);
    }
};

module.exports = resolvers;
