import React from 'react';
import { getFunName } from '../helpers';

class Storepicker extends React.Component {
  myInput = React.createRef();

  goToStore = (event) => {
    event.preventDefault();
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`);

  }



  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <div className="text" />
        <h2>Please enter a store</h2>
        <input type="text" ref={this.myInput} required placeholder="Enter a store name" defaultValue={getFunName()} />
        <button type='submit'>visit Store </button>
      </form>
    )
  }
}
export default Storepicker;