import React, { Component } from "react";
import Header from "./header.js";
import Blog from "./blog/component.js";
import Section from "./section.js";
import Projects from "./projects.js";

class Content extends Component {
  constructor(props) {
    super(props);
    let self = this;
    self.state = {};

    const set = (active, fn) => {
      active.classList[fn]("active");
      let parent = active.parentNode.parentNode.classList;
      if (parent.contains("menu-item"))
        parent[fn]("sub-active");
    };

    const highlight = event => {
      if (!self.state.sorted_headers) {
        let headers = [];
        document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(header => {
          let ref = header.innerHTML.toLowerCase().replace(/\s/g, "_");
          let dom = document.querySelector(`.menu-item[data-ref="#${ref}"]`);
          if (!dom) return;
          headers.push({
            dom: dom,
            top: header.getBoundingClientRect().top + window.scrollY - 29
          });
        });
        const cmp = (a, b) => (a.top === b.top ? 0 : a.top < b.top ? 1 : -1);
        headers.sort(cmp);
        self.setState({
          sorted_headers: headers
        });
        console.log(`MenuItems linked to headers: ${headers.length}`);
      }
      let y = event.pageY || window.scrollY;

      for (const header of self.state.sorted_headers) {
        if (header.top > y) continue;
        let active = self.state.active;
        if (active === header.dom) break;
        if (active) set(active,"remove");
        active = header.dom;
        set(active,"add");
        self.setState({
          active: active,
          sorted_headers: false
        });
        break;
      }
    };
    window.onhashchange = highlight;
    window.onscroll = highlight;
  }

  render() {
    return (
      <div className="tr content" onScroll={this.listenScrollEvent}>
        <Section
          title="Introduction"
          content={
            <React.Fragment>
              <p>
                This github.io page groups all my projects, another reference table can be found <a href="https://github.com/pontuslaestadius/portfolio">here</a>. This page will consist of project writeups and a programming related blog. <br />
              </p>
              <Header type="h3" title="About me" />
              <p>
                I am a 3rd year Software Engineering & Management Student at Gothenbourg University. I also intern part-time at Ericsson, but a lot of my sparetime revolves around learning new Programming languages, tools, algorithms and useful skills.
              </p>
              <Header type="h3" title="Contact" />
              <p>
                Follow me on
                <a href="https://github.com/pontuslaestadius"> Github </a> and
                get up to date information about projects I am working on.
              </p>
              <p>
                For anything else. <a
                  href='#'
                  onClick={_ =>
                    window.location.href=`mailto:${["pontus.laestadius", "ail.com"].join("@gm")}`
                  }
                >
                  Contact me by email
                </a>
                .
              </p>
            </React.Fragment>
          }
        />
        <Projects />
        <Section
          title={"Blog"}
          content={
            <React.Fragment>
              <p>
                Here are entries regarding programming related topics I feel the
                need to share my opinion on.
              </p>
              <Blog />
            </React.Fragment>
          }
        />
        <div className="footer flex">
          <p> This is the end.There is no more. </p>
        </div>
      </div>
    );
  }
}

export default Content;