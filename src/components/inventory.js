import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './addfishform';
import EditForm from './EditFishFrom';
import Login from './login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  static defaultProps = {
    fishes: PropTypes.object,
    updatedFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSimpleFishes: PropTypes.func
  }

  state = {
    uid: null,
    owner: null
  }


  authHandler = async (result) => {
    console.log('user', result)
    const store = await base.fetch(this.props.storeId, { context: this });
    if (!store.owners) {
      await base.post(`${this.props.storeId}/owners/`, {
        data: {
          name: result.user.displayName,
          uid: result.user.uid,
          email: result.user.email
        }
      })

    }

    this.setState({
      uid: result.user.uid,
      owner: store.owners.uid || result.user.uid
    })

  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // base.reset();
      }
      else {
        this.authHandler({ user });
      }
    })

  }


  authenticate = providers => {
    const provider = new firebase.auth[`${providers}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(this.authHandler);
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }


  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store</p>
          {logout}
        </div>
      )
    }

    return (
      <div className="inventory">
        {logout}
        {Object.keys(this.props.fishes).map(key =>

          <EditForm
            key={key}
            index={key}
            updatedFish={this.props.updatedFish}
            deleteFish={this.props.deleteFish}
            details={this.props.fishes[key]} />)}

        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSimpleFishes}>Load Simples</button>
      </div>
    )
  }
}

export default Inventory;