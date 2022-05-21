import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <nav className="login">
        <button className='github' onClick={() => this.props.authenticate('Github')}>
          GitHub
        </button>
        <button className='facebook' onClick={() => this.props.authenticate('Facebook')}>
          Facebook
        </button>
        <button className='twitter' onClick={() => this.props.authenticate('Google')}>
          Google
        </button>
      </nav>
    )
  }
}

export default Login;