import React from 'react';
import { Link } from "react-router-dom";


class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          day</h1>
        <h3 className="tagline">
        <Link to="/"><span>{this.props.tagline}</span></Link>
        </h3>
      </header>

    )
  }
}

export default Header;