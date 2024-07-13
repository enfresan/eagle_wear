//Archivo Saga que ejecuta las acciones del Login

import { takeLatest, call, put } from 'redux-saga/effects';
import * as loginActions from '../Actions/LoginActions';
import { loginCall, newUserCall } from '../../services/LoginServices';
import { message } from 'antd';

function* getLogin(action) {
    try {
        console.log(action);

        const response = yield call(loginCall, action.loginInfo);
        console.log(response);

        if (response.status === 200) {
            message.success('Bienvenido ' + action.loginInfo.userName);
            let token = response.data.token;
            console.log(token);
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', action.loginInfo.userName);

            yield put({ type: loginActions.LOGIN_API_CALL_SUCCESS,  usuario: action.loginInfo.userName, tokenLogin: token });
            yield put({ type: loginActions.DRAWER_LOGIN, drawerOpen: false });         
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

function* newUser(action) {
    try {
        console.log(action);
        const token = sessionStorage.getItem('token');

        const data = {
            email: action.form.email,
            username:action.form.username,
            password:action.form.password,
            name:{
                firstname: action.form.firstname,
                lastname: action.form.lastname
            },
            address:{
                city: action.form.city,
                street: action.form.street,
                number: action.form.number,
                zipcode: action.form.zipcode,
                geolocation:{
                    lat: action.form.lat,
                    long:action.form.long
                }
            },
            phone: action.form.phone
        };

        const response = yield call(newUserCall, token, data);
        console.log(response);
        if (response.status === 200) {
            message.success('Usuario creado con exito. ID: ' + response.data.id);

            yield put({ type: loginActions.CREATE_USER_SUCCESS });
            yield put({ type: loginActions.DRAWER_CREATE_USER, drawerCreateUserOpen: false, });
            yield put({ type: loginActions.CLEAN_FORM, cleanForm: 'crear-usuario', });
        } else {
            let errorMensaje = response;
            message.error(errorMensaje)
            yield put({ type: loginActions.CREATE_USER_FAILURE });
        }
    } catch (error) {
        yield put({ type: loginActions.CREATE_USER_FAILURE });
    }
} export function* nuevoTipoDeSolicitudSaga() {
    yield takeLatest(loginActions.CREATE_USER_REQUEST, newUser);
}

function* logoutSession(action) {
    try {
        console.log(action);
        
        yield put({ type: loginActions.LOG_OUT_SUCCESS });
        sessionStorage.clear();
    } catch (error) {
        yield put({ type: loginActions.LOG_OUT_FAILURE });
        sessionStorage.clear();
        window.location.reload();
    }
} export function* logoutSessionSaga() {
    yield takeLatest(loginActions.LOG_OUT_REQUEST, logoutSession);
}