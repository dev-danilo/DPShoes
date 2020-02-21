import { call, select, put, all, takeLatest } from 'redux-saga/effects';
// metodo call responsavel por chamar metodos assincronos de promises
// metodo select responsavel por fazer buscas dentro do estado
// metodo put dispara a action
// takelatest se o usuario fizer varias chamadas ao mesmo tempo,
// Saga vai descartar apartir da segunda, cadastrando apenas a primeira no carrinho
import api from '../../../services/api';
import { addToCartSuccess, updateAmount } from './actions';

import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  // (function*) generator como se fosse um async (babel converte async para generator)

  const productExists = yield select(state =>
    state.cart.find(p => p.id === id),
  );

  if (productExists) {
    const amount = productExists.amount + 1;

    yield put(updateAmount(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
// primeiro parametro takelatest é qual acao quer disparar
// segundo parametro takelatest é quao function sera chamada apos a execução da ação

// const productIndex = draft.findIndex(p => p.id === action.product.id);
// procura por um produto que ja esta no nosso carrinho draft.findIndex(p => p.id
// E se existe algum produto que o id é igual a esse que estamos recebendo da action -->  === action.product.id
