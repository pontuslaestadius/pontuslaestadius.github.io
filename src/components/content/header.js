import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type || "h1",
      title: props.title
    };
  }
  render() {
    return React.createElement("h1", {
      id: this.state.title.toLowerCase().replace(/\s/g, "_"),
      dangerouslySetInnerHTML: {
        __html: this.state.title
      }
    });
  }
}

export default Header;