import React from 'react';
import {formatPrice} from '../helpers';
import PropTypes from 'prop-types';

class Order extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    orders: PropTypes.object,
    deleteFishFromOrder:  PropTypes.func,
  }

  render() {
    

    const orderId = Object.keys(this.props.orders);

    //calculate the price
    const totalPrice = orderId.reduce((total, key) => {
      const fish = this.props.fishes[key];
      const NumberOfOrders = this.props.orders[key];
      const isAvailable = fish && fish.status === 'available';

      if (isAvailable) {
        return total + (NumberOfOrders * fish.price);
      }
      return total;
    }, 0);

    // List of orders
    const listOfOrders = orderId.map(key => {
      


      const fish = this.props.fishes[key];
      const NumberOfOrders = this.props.orders[key];
      const isAvailable = fish && fish.status === 'available';

      //wait for the fish to load
      if(!fish) return null;

      if (!isAvailable) {
        return <li key={key}>Sorry {fish ? fish.name : 'fish'} Out of stock </li> 
      }

      return <li key={key} index={key}>
      <span className='count'>{NumberOfOrders} lbs</span>
      <span>{fish.name}</span>
      <span className='price'>{formatPrice(fish.price * NumberOfOrders)}</span>
      <button onClick={() => this.props.deleteFishFromOrder(key)}>&times;</button>
      </li>
    });


    return (
      <div className="order-wrap">
      <h2>Orders</h2>
      <ul className="order">
      {listOfOrders}
      </ul>
      <div className="total">
      Total: {formatPrice(totalPrice)}
      </div>
      </div>
    )
  }
}

export default Order;