import * as loginActions from '../Actions/LoginActions';

const initialState = {
    fetchingLogin: false,
    tokenLogin: null,
    errorLogin: false,
    errorMensaje: null,
    usuario: sessionStorage.getItem('userInfo'),
    isAuthenticated: false,

    drawerOpen: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case loginActions.LOGIN_API_CALL_REQUEST:
            return { ...state, fetchingLogin: true, errorLogin: false };
        case loginActions.LOGIN_API_CALL_SUCCESS:
            return { ...state, fetchingLogin: false, usuario: action.usuario, tokenLogin: action.token, isAuthenticated: true, errorLogin: false, fetchingLogout: false };
        case loginActions.LOGIN_API_CALL_FAILURE:
            return { ...state, fetchingLogin: false, errorLogin: true, errorMensaje: action.errorMensaje, isAuthenticated: false };

        case loginActions.DRAWER_LOGIN: 
            return { ...state, drawerOpen: action.drawerOpen }

        default:
            return state;
    }
};