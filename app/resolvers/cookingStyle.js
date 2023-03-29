module.exports = {
    restaurants(parent, _, { dataSources }) {
        return dataSources.restoDB.restaurant.findByType(parent.id);
    },
};
