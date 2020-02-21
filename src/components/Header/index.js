import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

function Header() {
  const cartSize = useSelector(state =>
    state.cart.reduce((total, p) => {
      return total + p.amount;
    }, 0),
  );

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>
            {cartSize <= 1 ? `${cartSize} item` : `${cartSize} itens`}
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cart: state.cart,
}))(Header);
