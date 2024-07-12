import * as loginActions from '../Actions/LoginActions';

const initialState = {
    cleanForm: null,
    fetchingLogin: false,
    tokenLogin: null,
    errorLogin: false,
    errorMensaje: null,
    usuario: sessionStorage.getItem('userInfo'),
    isAuthenticated: false,

    drawerOpen: false,
    drawerCreateUserOpen: false,

    fetchingCreateUser: false,
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
        
        case loginActions.DRAWER_CREATE_USER: 
            return { ...state, drawerCreateUserOpen: action.drawerCreateUserOpen }

        case loginActions.CLEAN_FORM:
            return { ...state, cleanForm: action.cleanForm };

        case loginActions.CREATE_USER_REQUEST:
            return { ...state, fetchingCreateUser: true, };
        case loginActions.CREATE_USER_SUCCESS:
            return { ...state, fetchingCreateUser: false, };
        case loginActions.CREATE_USER_FAILURE:
            return { ...state, fetchingCreateUser: false, };

        default:
            return state;
    }
};