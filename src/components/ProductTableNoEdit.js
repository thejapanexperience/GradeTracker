import React, { Component } from 'react';
import numeral from 'numeral';

const ProductTable = props => {
  const { products } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{numeral(product.price).format('$0,0.00')}</td>
          </tr>
          ))}
      </tbody>
    </table>
  )
}

export default ProductTable