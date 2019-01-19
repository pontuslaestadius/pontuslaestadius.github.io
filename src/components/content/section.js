import React, { Component } from "react";
import Header from "./header.js";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      content: props.content
    };
  }

  render() {
    return (
      <div className="section">
        <Header title={this.state.title} />
        <div className="section-content"> {this.state.content} </div>
      </div>
    );
  }
}

export default Section;