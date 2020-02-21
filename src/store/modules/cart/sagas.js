import { call, select, put, all, takeLatest } from 'redux-saga/effects';
// metodo call responsavel por chamar metodos assincronos de promises
// metodo select responsavel por fazer buscas dentro do estado
// metodo put dispara a action
// takelatest se o usuario fizer varias chamadas ao mesmo tempo,
// Saga vai descartar apartir da segunda, cadastrando apenas a primeira no carrinho
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { addToCartSuccess, updateAmountSuccess } from './actions';

import { formatPrice } from '../../../util/format';

import history from '../../../services/history';

function* addToCart({ id }) {
  // (function*) generator como se fosse um async (babel converte async para generator)

  const productExists = yield select(state =>
    state.cart.find(p => p.id === id),
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;

  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Sem estoque!!! 😔');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Sem estoque!!! 😔');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
// primeiro parametro takelatest é qual acao quer disparar
// segundo parametro takelatest é quao function sera chamada apos a execução da ação

// const productIndex = draft.findIndex(p => p.id === action.product.id);
// procura por um produto que ja esta no nosso carrinho draft.findIndex(p => p.id
// E se existe algum produto que o id é igual a esse que estamos recebendo da action -->  === action.product.id
