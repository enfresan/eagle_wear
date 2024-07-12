//Archivo que une todos los archivos Saga
import { all, fork } from "redux-saga/effects";
import * as LoginSaga from "../Sagas/LoginSaga";
import * as ProductsSaga from "../Sagas/ProductsSaga";

export default function* rootSaga() {

  var allSagas = Object.assign(LoginSaga, ProductsSaga);

  yield all(
    [...Object.values(allSagas)].map(fork)
  );
}