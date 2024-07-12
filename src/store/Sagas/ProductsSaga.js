import { takeLatest, call, put } from 'redux-saga/effects';
import * as productsActions from '../Actions/ProductsActions';
import { getListAllProductsCall, productListByCategoryCall } from '../../services/ProductsServices';

function* allProductsList(action) {
    try {
        console.log(action);
        //const token = sessionStorage.getItem('token');
        const limit = action.limit ? "?limit=" + action.limit : "";
        const sort = action.limit ? action.sort ? "&sort=" + action.sort : "" : action.sort ? "?sort=" + action.sort : "";

        const response = yield call(getListAllProductsCall, limit, sort);
        console.log('response', response);
        if (response.status === 200) {
            const allProductsList = response.data;
            const countAllProducts = response.data.length;
            const allProductsBagList = response.data;

            allProductsBagList.forEach(product => { product.countBag = 0;  });

            yield put({ type: productsActions.GET_ALL_PRODUCTS_SUCCESS, allProductsList, countAllProducts, allProductsBagList });
        } else {
            yield put({ type: productsActions.GET_ALL_PRODUCTS_FAILURE });
        }
    } catch (error) {
        yield put({ type: productsActions.GET_ALL_PRODUCTS_FAILURE });
    }
}
export function* allProductsListSaga() {
    yield takeLatest(productsActions.GET_ALL_PRODUCTS_REQUEST, allProductsList);
}

function* productListByCategory(action) {
    try {
        console.log(action);
        //const token = sessionStorage.getItem('token');

        const response = yield call(productListByCategoryCall, action.category);
        console.log('response', response);
        if (response.status === 200) {
            let allProductsList = response.data;
            const countAllProducts = response.data.length;

            
            yield put({ type: productsActions.GET_PRODUCTS_BY_CATEGORY_SUCCESS, allProductsList, countAllProducts });
        } else {
            yield put({ type: productsActions.GET_PRODUCTS_BY_CATEGORY_FAILURE });
        }
    } catch (error) {
        yield put({ type: productsActions.GET_PRODUCTS_BY_CATEGORY_FAILURE });
    }
}
export function* productListByCategorySaga() {
    yield takeLatest(productsActions.GET_PRODUCTS_BY_CATEGORY_REQUEST, productListByCategory);
}