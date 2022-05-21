import React from 'react';
import PropTypes from 'prop-types';

class EditForm extends React.Component {
  static defaultProps = {
    details: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string
    }),
    deleteFish: PropTypes.func,
  }
  
  updateHandler = (e) => {

    const updatedFish = {
      ...this.props.details,
      [e.target.name]: e.target.value
    }
    this.props.updatedFish(this.props.index, updatedFish);
  }

  render(){

    return (
        <form className='fish-edit'>
        <input type="text" name='name' placeholder="name" value={this.props.details.name} onChange={this.updateHandler}></input>
        <input type="number" name='price'  placeholder="price" value={this.props.details.price} onChange={this.updateHandler}></input>
        <select type="text" name='status' placeholder="status" value={this.props.details.status} onChange={this.updateHandler}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold out</option>
        </select>
        <textarea type="text" name='descr' placeholder="descr" value={this.props.details.desc} onChange={this.updateHandler}></textarea>
        <input name='image' type="text" placeholder="image" value={this.props.details.image} onChange={this.updateHandler}></input>
        <button onClick={() => {this.props.deleteFish(this.props.index)}}>Delete Fish</button>
      </form>
      )
  }
}

export default EditForm;