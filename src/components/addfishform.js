import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {
  static defaultProps = {
    addFish: PropTypes.func,
  }

  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (e) => {
    e.preventDefault();

    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    }

    this.props.addFish(fish);
    e.target.reset();

  }
  
  render() {
    return (
      <form className='fish-edit'  onSubmit={this.createFish}>
        <input type="text" placeholder="name" ref={this.nameRef} required></input>
        <input type="number" placeholder="price" ref={this.priceRef} required></input>
        <select type="text" placeholder="status" ref={this.statusRef} required>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold out</option>
        </select>
        <textarea type="text" placeholder="descr" ref={this.descRef} required></textarea>
        <input name='image' type="text" placeholder="image" ref={this.imageRef} required></input>
        <button type="submit">+ add Fish</button>
      </form>
    )
  }
}

export default AddFishForm;