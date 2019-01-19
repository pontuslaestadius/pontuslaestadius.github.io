import React, { Component } from "react";
import Entry from "./entry.js";

class Blog extends Component {
  render() {
    return (
      <div className="blog">
        <Entry title="test" />
      </div>
    );
  }
}

export default Blog;