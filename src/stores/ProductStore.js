import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';
import Storage from '../Storage';

let _products = Storage.read('products') || [];

class ProductStore extends EventEmitter {

  constructor() {
    super();

    AppDispatcher.register(action => {

      let { product } = action.payload;
      console.log('product store ',product)
      
      switch(action.type) {
        
        case 'PRODUCT_CREATE':
/*        let { product } = action.payload;
*/      _products.push(product);
        this.emit('CHANGE')
        
        case 'PRODUCT_EDIT':
        let id = product.id
        console.log('product store PRODUCT_EDIT ',product)
        console.log(_products) 
        console.log(id)      
        let index = _products.findIndex(x => x.id===id)        
        console.log('index of id :',index)
        _products[index] = product;
        this.emit('CHANGE')
      }

    });

    this.on('CHANGE',() => {
      Storage.write('products', _products)
    });

  } 

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb)
  }

  getAll() {
    return _products;
  }
}

export default new ProductStore();