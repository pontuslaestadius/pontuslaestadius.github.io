import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <h2 id={this.state.title.toLowerCase().replace(/\s/g, "_")}>
            {this.state.title}
          </h2>
          <h5 className="sub_header">
            {this.state.sub_title}
          </h5>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;