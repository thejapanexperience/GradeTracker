 import React, { Component } from 'react';
 import NewProductForm from './NewProductForm';
 import ProductsContainer from './ProductsContainer'

 export default class Layout extends Component {
  render() { 
    return (
      <div className="container">
        <h1 className="text-center">Product List</h1>

        <NewProductForm /> 
        <ProductsContainer />

      </div>)
  }
 }