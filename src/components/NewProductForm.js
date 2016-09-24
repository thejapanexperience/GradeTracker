 import React, { Component } from 'react';
 import uuid from 'uuid';
 import ProductActions from '../actions/ProductActions';

 export default class NewProductForm extends Component {

  constructor(props) {
    super(props);
    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm(e) {
    e.preventDefault();
    const { newProductName, newProductPrice } = this.refs;

    let product = {
      name: newProductName.value,
      price: parseFloat(newProductPrice.value),
      id: uuid()
    }

    newProductName.value = '';
    newProductPrice.value = '';
    newProductName.focus();

    ProductActions.create(product);
  }

  render () {
    return (
      <form onSubmit={this._submitForm} className="form-inline text-center">
        <div className="form-group">
          <label htmlFor="newProductName">New Product Name:</label>
          <input ref='newProductName' type="text" className="form-control" id='newProductName' required/>
        </div>
        <div className="form-group">
          <label htmlFor="newProductPrice">New Product Price:</label>
          <input ref='newProductPrice' type="number" className="form-control" id='newProductPrice' required min='0' step='0.01'/>
        </div>
        <button className="btn btn-default">Add Products</button>
      </form>
      )
  }
 }