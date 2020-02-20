import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);
        // procura por um produto que ja esta no nosso carrinho draft.findIndex(p => p.id
        // E se existe algum produto que o id é igual a esse que estamos recebendo da action -->  === action.product.id

        if (productIndex >= 0) {
          // se existir adiciona +1 no amount
          draft[productIndex].amount += 1;
        } else {
          // se não, cria novo item no carrinho e adiciona 1 no amount
          draft.push({
            ...action.product,
            amount: 1,
          });
        }
      });
    case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        // procura por um produto que ja esta no nosso carrinho draft.findIndex(p => p.id
        // E se existe algum produto que o id é igual a esse que estamos recebendo da action

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    default:
      return state;
  }
}
