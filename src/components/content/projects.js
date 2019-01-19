import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./header.js";
import FancySection from "./fancy/component.js";
import Section from "./section.js";

class Projects extends Component {
  render() {
    return (
      <React.Fragment>
        <Section
          title={"Projects"}
          content={
            <p>
              Here are a list of highlighted projects I have developed. Keep in mind these are often proof of concepts when experimenting with new techonologies which I am exercising.
            </p>
          }
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
                Pathfinder is a Node based graphics library for generating images and gifs with connected nodes.
              </p>
              <p>
                A two year project which is still in progress, with 1400+ downloads. It was the first semi-large Rust project which taught me many advantages of programming in Rust.
              </p>
              <p>
                The images shown are example outputs from the library. And can be located along with the example code that generated them in the github repository. Click the Code-branch indicator next to the 'pathfinder' to get there.
              </p>
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
              <p>
                I wanted to see if it was feasible to generate javascript code from comments, there was a few issues because javascript functions can be very abstractly defined.
              </p>
              <p>
                It remains a proof of concept since no one would integrated a Rust service to test your vanillia Javascript or Node projects.
              </p>
              <p>
                It is thus adviced that such functionality would be implemented in a seperate npm package, if one does not already exist. But that results in it not being as adept for vanila javascript which is a requirement when doing development in the <a href='https://developer.tizen.org/'>Tizen sdk</a>. Which of course you could compile your code down to ES3 standard to support, so there are many counter arguments towards not continuing with this.
              </p>
            </React.Fragment>
            }
          />
          <FancySection
            title="this page"
            background="bionic"
            images={
              <React.Fragment>
                <img
                  alt="Gimpified render of the site"
                  src="resources/site.gif" />
              </React.Fragment>
            }
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
                  This static web page is developed using <a href="https://reactjs.org/"> React</a>.
                </p>
                <p>
                It was developed in a week, between week 2 and week 3 of 2019. In an attempt to get familiar with React and better show off previous projects, thus it being the focus of the page.
              </p>
              <p>
                The menu was tedious to develop but I am quite happy about the resulting product, it has shown issues in self selecting the menu item based on scrolling in Firefox. And it at times be improperly offset.
              </p>
              <p>
                It <i>tries</i> to only use JavaScript for non-required browsing features. I do realize this is not optimal being a React static page, but I do think it's an important design philosofy.
              </p>
              <p>
                Reiterating on the menu features, including an icon made using only Text and CSS. Which I thought was pretty fun to create, but obviously not optimal for browsers which might render it differently. Additionally the <b>dark mode</b> uses a very browser compatible way of setting the body tag which then inherits to the children when enabled. It's not optimal but it is a viable solution while waiting for all browsers to offically support prefer-dark-scheme CSS query.
              </p>
            </React.Fragment>
          }
        />
      </React.Fragment>
    );
  }
}

        export default Projects;