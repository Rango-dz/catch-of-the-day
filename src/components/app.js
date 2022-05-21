import React, { Component, useEffect } from 'react';
import Header from './header';
import Order from './order';
import Inventory from './inventory';
import fishes from '../sample-fishes';
import Fish from './fish';
import base from '../base';

class App extends Component {
  state = {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    const { params } = this.props.match;

    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes });

  }

  updatedFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  }

  deleteFishFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  }

  loadSimpleFishes = () => {
    this.setState({ fishes })
  }

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order: order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seefood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish
              key={key}
              index={key}
              details={this.state.fishes[key]}
              addToOrder={this.addToOrder}
            />)}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          orders={this.state.order}
          deleteFishFromOrder={this.deleteFishFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSimpleFishes={this.loadSimpleFishes}
          fishes={this.state.fishes}
          updatedFish={this.updatedFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App;