module.exports = {
    restaurants(parent, _, { dataSources }) {
        return dataSources.restoDB.restaurant.findByCookingStyle(parent.id);
    },
};
