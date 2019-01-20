import React, { Component } from "react";
import Header from "./header.js";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <div className={`section border ${this.state.className||''}`}>
        <Header title={this.state.title} />
        <div className="section-content"> {this.state.content} </div>
      </div>
    );
  }
}

export default Section;