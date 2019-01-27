import React, { Component } from "react";
import Header from "./header.js";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
  }

  render() {
    return (
      <React.Fragment>
      <div data-background={this.state.background}>
        <Header title={this.state.title} sub_title={this.state.sub_title} />
        <div className={`section ${this.state.className||''}`}>
          <div className="section-content"> {this.state.content} </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Section;