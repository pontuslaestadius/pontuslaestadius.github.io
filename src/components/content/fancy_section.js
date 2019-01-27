import React, { Component } from "react";
import Section from "./section.js";

class FancySection extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
  }
  render() {
    return (
      <Section {...this.state} className="section-large" content={
        <div className="section-image-wrapper">
            {this.state.content}
          </div>
      } />
    );
  }
}

export default FancySection;