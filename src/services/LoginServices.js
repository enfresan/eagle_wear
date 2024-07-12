import axios from 'axios';

const endpoint = 'https://fakestoreapi.com/';

export function loginCall(loginInfo) {
    return axios({
        method: 'post',
        url: endpoint + 'auth/login',
        data: {
            "username": loginInfo.userName,
            "password": loginInfo.password,
        },
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response.data;
        });
}