import * as productsActions from '../Actions/ProductsActions';

const initialState = {
    fetchingGetAllProducts: false,
    allProductsList: [],
    allProductsBagList: [],
    countAllProducts: null,
    drawerOpenBag: false,
    productSelected: undefined,
    drawerOpenBagDetail: false,
    listWithProducts: [],
    total: null,
    totalItems: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case productsActions.GET_ALL_PRODUCTS_REQUEST:
            return { ...state, fetchingGetAllProducts: true };
        case productsActions.GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, fetchingGetAllProducts: false, allProductsList: action.allProductsList, countAllProducts: action.countAllProducts };
        case productsActions.GET_ALL_PRODUCTS_FAILURE:
            return { ...state, fetchingGetAllProducts: false };

        case productsActions.GET_INITIAL_ALL_PRODUCTS_REQUEST:
            return { ...state, fetchingGetAllProducts: true };
        case productsActions.GET_INITIAL_ALL_PRODUCTS_SUCCESS:
            return { ...state, fetchingGetAllProducts: false, allProductsBagList: action.allProductsBagList  };
        case productsActions.GET_INITIAL_ALL_PRODUCTS_FAILURE:
            return { ...state, fetchingGetAllProducts: false };


        case productsActions.GET_PRODUCTS_BY_CATEGORY_REQUEST:
            return { ...state, fetchingGetAllProducts: true };
        case productsActions.GET_PRODUCTS_BY_CATEGORY_SUCCESS:
            return { ...state, fetchingGetAllProducts: false, allProductsList: action.allProductsList, countAllProducts: action.countAllProducts };
        case productsActions.GET_PRODUCTS_BY_CATEGORY_FAILURE:
            return { ...state, fetchingGetAllProducts: false };

        case productsActions.UPDATE_BAG_PRODUCTS:
            return { ...state, allProductsBagList: action.allProductsBagList, listWithProducts: action.listWithProducts, total: action.total  }

        case productsActions.TOTAL_ITEMS:
            return { ...state, totalItems: action.totalItems  }
            
        case productsActions.DRAWER_BAG_DETAIL:
            return { ...state, drawerOpenBagDetail: action.drawerOpenBagDetail}

        case productsActions.DRAWER_BAG:
            return { ...state, drawerOpenBag: action.drawerOpenBag, productSelected: action.productSelected }

        default:
            return state;
    }
};