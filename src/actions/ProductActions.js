import AppDispatcher from '../AppDispatcher';

const ProductActions = {
  
  create(product) {
    AppDispatcher.dispatch({
      type: 'PRODUCT_CREATE',
      payload: { product }
    })
  },

  edit(product){
    AppDispatcher.dispatch({
      type:'PRODUCT_EDIT',
      payload: {product}
    })
    console.log('AppDispatcher edit function: ',product)
  }

}

export default ProductActions;
