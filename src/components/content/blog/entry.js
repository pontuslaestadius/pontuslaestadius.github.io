import React, { Component } from "react";
import Section from "./../section.js";

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  render() {
    return (
      <Section {...this.state} className="entry" />
    );
  }
}

export default Entry;