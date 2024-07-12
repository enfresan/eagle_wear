//Archivo Saga que ejecuta las acciones del Login

import { takeLatest, call, put } from 'redux-saga/effects';
import * as loginActions from '../Actions/LoginActions';
import { loginCall } from '../../services/LoginServices';
import { message } from 'antd';

//********************** LOGIN *****************************
function* getLogin(action) {
    try {
        console.log(action);

        const response = yield call(loginCall, action.loginInfo);
        console.log(response);

        if (response.status === 200) {
            message.success('Bienvenido ' + action.loginInfo.userName);
            let token = response.data.token;
            console.log(token);
            yield put({ type: loginActions.LOGIN_API_CALL_SUCCESS,  usuario: action.loginInfo.userName, tokenLogin: token });             
        } else {
            let errorMensaje = response;
            message.error(errorMensaje)
            yield put({ type: loginActions.LOGIN_API_CALL_FAILURE, errorMensaje });
        }
    } catch (error) {
        let errorMensaje = error;
        // dispatch a failure action to the store with the error
        yield put({ type: loginActions.LOGIN_API_CALL_FAILURE, errorMensaje });
    }
}
export function* getLoginSaga() {
    yield takeLatest(loginActions.LOGIN_API_CALL_REQUEST, getLogin);
}