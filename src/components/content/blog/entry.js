import React, { Component } from "react";
import Header from "./../header.js";
import Section from "./../section.js";

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title
    }
  }
  render() {
    return (
      <Section {...this.state} content={
        <p>
          Sample
        </p>
      } />
    );
  }
}

export default Entry;