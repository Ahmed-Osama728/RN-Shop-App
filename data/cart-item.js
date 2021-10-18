class CartItem {
  constructor(qty, productTitle, productPrice, sum) {
    (this.qty = qty),
      (this.productTitle = productTitle),
      (this.productPrice = productPrice),
      (this.sum = sum);
  }
}

export default CartItem;
