import React, { Component } from "react";
import Menu from "./components/menu/component.js";
import Content from "./components/content/component.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faAt,
  faCat,
  faFeatherAlt,
  faDragon,
  faBroom,
  faIgloo,
  faCodeBranch,
  faCube,
  faAdjust,
  faArchive,
  faAngleDown,
  faAngleUp
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBars,
  faAt,
  faCat,
  faFeatherAlt,
  faDragon,
  faBroom,
  faIgloo,
  faCodeBranch,
  faCube,
  faAdjust,
  faArchive,
  faAngleDown,
  faAngleUp
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // Load in content from somewhere..
    // Generate menu from content
    this.state = {
      menuItems: [
        {
          icon: "cat",
          label: "Introduction",
          href: "#introduction",
          subMenu: [
            {
              label: "About me",
              href: "#about_me"
            },
            {
              label: "Contact",
              href: "#contact"
            }
          ]
        },
        {
          icon: "dragon",
          label: "Projects",
          href: "#projects",
          subMenu: [
            {
              label: "pathfinder",
              href: "#pathfinder"
            },
            {
              label: "js-irt",
              href: "#js-irt"
            },
            {
              label: "this page",
              href: "#this_page"
            }
          ]
        },
        {
          icon: "broom",
          label: "Blog",
          href: "#blog",
          subMenu: []
        }
      ]
    };
  }

  render() {
    return (
      <React.Fragment>
        <Menu menuItems={this.state.menuItems} />
        <Content sections={this.state.sections} />
      </React.Fragment>
    );
  }
}

export default App;