import React, { Component } from "react";
import Entry from "./entry.js";

class Blog extends Component {
  render() {
    return (
      <div className="blog">
        <Entry title="test" content={
          <React.Fragment>
            <p>Sample content here.</p>
          </React.Fragment>
        }/>
      </div>
    );
  }
}

export default Blog;