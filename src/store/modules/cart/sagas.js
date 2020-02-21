import { call, put, all, takeLatest } from 'redux-saga/effects';
// metodo call responsavel por chamar metodos assincronos de promises
// metodo put dispara a action
// takelatest se o usuario fizer varias chamadas ao mesmo tempo,
// Saga vai descartar apartir da segunda, cadastrando apenas a primeira no carrinho
import api from '../../../services/api';
import { addToCartSuccess } from './actions';

function* addToCart({ id }) {
  // (function*) generator como se fosse um async (babel converte async para generator)
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
// primeiro parametro takelatest é qual acao quer disparar
// segundo parametro takelatest é quao function sera chamada apos a execução da ação
