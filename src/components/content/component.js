import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./header.js";
import FancySection from "./fancy/component.js";

function Section(props) {
  return (
    <div className="section">
      <Header title={props.title} />
      <div className="section-content"> {props.content} </div>
    </div>
  );
}

class Content extends Component {
  constructor(props) {
    super(props);
    let self = this;
    self.state = {};
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
        const set = fn => {
          active.classList[fn]("active");
          if (active.parentNode.parentNode.classList.contains("menu-item"))
            active.parentNode.parentNode.classList[fn]("sub-active");
        };
        if (active) set("remove");
        active = header.dom;
        set("add");
        self.setState({
          active: active
        });
        break;
      }
    };
    window.onhashchange = highlight;
    window.onscroll = highlight;
  }

  render() {
    return (
      <div className="content" onScroll={this.listenScrollEvent}>
        <Section
          title="Introduction"
          content={
            <React.Fragment>
              <p>
                <b> Hi,</b> <br />
                This
                <a href="https://pontuslaestadius.github.io">
                  
                  github.io page
                </a>
                groups all my projects, another reference table can be found
                <a href="https://github.com/pontuslaestadius/portfolio">
                  
                  here
                </a>
                . This page will consist of project writeups and a programming
                related blog. <br />
              </p>
              <Header type="h2" title="About me" />
              <p>
                I am a 3 rd year Software Engineering & Management Student at
                Gothenbourg University. I also intern part - time at Ericsson,
                but a lot of my spare - time revolves around learning new
                Programming languages, tools, algorithms and useful skills.
              </p>
            </React.Fragment>
          }
        />
        <Section
          title={"Projects"}
          content={"Here are a list of projects I've published and developed."}
        />
        <FancySection
          title="pathfinder"
          background="star"
          images={
            <React.Fragment>
              <img
                alt="Node plotting example"
                src="https://raw.githubusercontent.com/pontuslaestadius/pathfinder/master/examples/out/node_plot.gif"
              />
              <img
                alt="A simple linked list on Nodes"
                src="https://raw.githubusercontent.com/pontuslaestadius/pathfinder/master/examples/out/hello_world.png"
              />
              <img
                alt="A randomized large number of Nodes"
                src="https://raw.githubusercontent.com/pontuslaestadius/pathfinder/master/examples/out/random.jpg"
              />
            </React.Fragment>
          }
          links={
            <React.Fragment>
              <a href="https://github.com/pontuslaestadius/pathfinder">
                <FontAwesomeIcon icon="code-branch" />
              </a>
              <a href="https://crates.io/crates/pathfinder">
                <FontAwesomeIcon icon="cube" />
              </a>
            </React.Fragment>
          }
          description={
            <React.Fragment>
              <p>
                Pathfinder is a Node based graphics library for generating
                images and gifs with connected nodes.
              </p>
              <p>
                A two year project which is still in progress, with 1400 +
                downloads.
              </p>
              <p>
                First semi - large Rust project which taught my many language
                specific features.
              </p>
              <p>The images shown are example outputs from the library. </p>
            </React.Fragment>
          }
        />
        <FancySection
          title="js-irt"
          images={
            <React.Fragment>
              <img alt="Test example" src="resources/jsirt.gif" />
            </React.Fragment>
          }
          links={
            <React.Fragment>
              <a href="https://github.com/pontuslaestadius/js-irt">
                <FontAwesomeIcon icon="code-branch" />
              </a>
            </React.Fragment>
          }
          description={
            <React.Fragment>
              <p>js - irt stands for Javascript inline Rust testing </p>
              <p>
                It tests the bounderies of what can be done in your.js files
                when tests are run from a rust module.
              </p>
            </React.Fragment>
          }
        />
        <FancySection
          title="this page"
          background="bionic"
          images={<React.Fragment />}
          links={
            <React.Fragment>
              <a href="https://github.com/pontuslaestadius/pontuslaestadius.github.io/tree/develop">
                <FontAwesomeIcon icon="code-branch" />
              </a>
            </React.Fragment>
          }
          description={
            <React.Fragment>
              <p>
                This static web page is developed using
                <a href="https://reactjs.org/"> React </a>.
              </p>
            </React.Fragment>
          }
        />
        <Section
          title={"Blog"}
          content={
            <React.Fragment>
              <p>
                Here are entries regarding programming related topics I feel the
                need to share my opinion on.
              </p>
            </React.Fragment>
          }
        />
        <Section
          title={"Contact"}
          content={
            <React.Fragment>
              <Header type="h2" title="Github" />
              <p>
                Follow me on
                <a href="https://github.com/pontuslaestadius"> Github </a> and
                get up to date information about projects I am working on.
              </p>
              <Header type="h2" title="Email" />
              <p>
                For any questions, concerns or work.
                <a
                  href='\
                        // eslint-disable-next-line \
                        javascript:window.location.href = "mailto:" + ["pontus.laestadius", "ail.com"].join("@gm")'
                >
                  Contact me by email
                </a>
                .
              </p>
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