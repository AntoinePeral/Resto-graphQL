import {gql} from '@apollo/client';

export const RESTAURANTS = gql`
query {
    getAllRestaurants {
      id
      name
      city {
        id
        name
      }
      cookingStyles {
        id
        label
      }
    }
  }
`;

export const RESTAURANT = gql`
query Restaurant($id: Int!) {
    getRestaurant(id: $id) {
      name
      description
      terrace
      manager {
        id
        firstname
        lastname
      }
      city {
        id
        name
      }
      cookingStyles {
        id
        label
      }
    }
  }
`;

export const CITIES = gql`
query {
    getAllCities {
      id
      name
      restaurants {
        id
        name
        cookingStyles {
            id
            label
          }
        }
    }
  }
`;

export const CITY = gql`
query City($id: Int!) {
    getCity(id: $id) {
      name
      postal_code
      restaurants {
        id
        name
        cookingStyles {
            id
            label
        }
      }
    }
  }
`;

export const CITIES_SELECT = gql`
query {
    getAllCities {
        id
        name
    }
}
`;



export const COOKING_STYLES = gql`
query {
    getAllCookingStyles {
      id
      label
    }
  }
`;

export const COOKING_STYLE = gql`
query CookingStyle($id: Int!) {
    getCookingStyle(id: $id) {
      label
      restaurants {
        id
        name
        city {
            id
            name
        }
      }
    }
  }
`;

export const MANAGERS_SELECT = gql`
query {
    getAllManagers {
        id
        firstname
        lastname
    }
}
`;




export const CREATE_CITY = gql`
mutation AddCity($input: CreateCityInput!) {
    createCity(input: $input) {
        id
    }
}
`;

export const CREATE_COOKING_STYLE = gql`
mutation CreateCookingStyle($input: CreateCookingStyleInput!) {
    createCookingStyle(input: $input) {
        id
    }
}
`;

export const CREATE_RESTAURANT = gql`
mutation CreateRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
        id
    }
}
`;

export const UPDATE_RESTAURANT = gql`
mutation UpdateRestaurant($input: UpdateRestaurantInput!) {
    updateRestaurant(input: $input) {
        id
    }
}
`;

export const DELETE_RESTAURANT = gql`
mutation DeleteRestaurant($id: Int!) {
    deleteRestaurant(id: $id)
}
`;
