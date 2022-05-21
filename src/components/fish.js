import React from 'react';
import {formatPrice} from '../helpers';
import PropTypes from 'prop-types';

class Fish extends React.Component {
  handleClick = () => { 
    this.props.addToOrder(this.props.index);
  }

  static defaultProps = {
    details: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string
    }),
    addToOrder: PropTypes.func,
  }
  
  render() {

    const {name, desc, image, price, status} = this.props.details;
    const isAvailable  = status === "available";
    return (

        <li className='menu-fish'>
          <img src={image} alt={name} />
          <h3 className="fish-name">{name}
          <span className='price'>{formatPrice(price)}</span>
          </h3>
          
          <p>{desc}</p>
          <button 
          disabled={!isAvailable} 
          onClick={this.handleClick}
          >
          {isAvailable? 'Add to Cart': 'Sold Out'} 
          </button>
        </li>
    )

  }
}

export default Fish;