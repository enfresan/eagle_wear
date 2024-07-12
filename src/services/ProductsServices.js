import axios from 'axios';

const endpoint = 'https://fakestoreapi.com/';

export function getListAllProductsCall(limit, sort) {
    return axios({
        method: 'get',
        url: endpoint + 'products' + limit + sort,
        headers: { 'Content-Type': 'application/json'},
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export function productListByCategoryCall(category) {
    return axios({
        method: 'get',
        url: endpoint + 'products/category/' + category,
        headers: { 'Content-Type': 'application/json'},
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response.data;
        });
}