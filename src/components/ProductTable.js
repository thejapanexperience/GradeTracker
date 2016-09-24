import React, { Component } from 'react';
import numeral from 'numeral';
import ProductActions from '../actions/ProductActions';


export default class ProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editId: null
    }
    this._startEdit = this._startEdit.bind(this)
    this._stopEdit = this._stopEdit.bind(this)
    this._saveEdit = this._saveEdit.bind(this)
  }

  _startEdit(editId) {
    this.setState({ editId });
  }

  _stopEdit() {
    let editId = null;
    this.setState({ editId })
  }

  _saveEdit(product) {
    let { name, price } = this.refs;

    let newObject = Object.assign({}, product, {
      name: name.value,
      price: parseFloat(price.value)
    });

    console.log(newObject) /*<----------FLUXIFY*/
    ProductActions.edit(newObject);


    this._stopEdit(); 
  }

  render() {
    const { products } = this.props;
    const { editId } = this.state;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            let { id, name, price } = product;

            if(id === editId) {
              return (
                <tr key={id}>
                  <td>
                    <input type="text" ref="name" defaultValue={name}/>
                  </td>
                  <td>
                    <input type="number" ref="price" defaultValue={price} min="0" step="0.00" />
                  </td>
                  <td><button onClick={this._saveEdit.bind(this, product)}>Save</button>
                  <button onClick={this._stopEdit} >Cancel</button>
                  </td>
                </tr>
                )
            } else {
              return(
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{numeral(price).format('$0,0.00')}</td>
                    <td>
                      <button disabled={editId} onClick={this._startEdit.bind(this, id)} >Edit</button>
                    </td>
                  </tr>
                )
            }
          })}
        </tbody>
      </table>
      )
  }
}