import React, { Component } from "react";
import MenuItem from "./../menuitem/component.js";

function Icon() {
  return (
    <div className="icon">
      <div className="zero">P</div>
      <div className="one">ontus</div>
      <div className="two vh">L</div>
      <div className="three h">aestadius</div>
    </div>
  );
}

class Settings extends Component {
  render() {
    let icon = <Icon />;
    return (
      <div className="settings">
        <MenuItem icon="igloo" title="home" href="#root" label={icon} />
        <MenuItem
          icon="bars"
          label="Small sidebar"
          onClick={_ => {
            let node = document.querySelector("nav");
            node.classList[node.classList.contains("small") ? "remove" : "add"](
              "small"
            );
          }}
        />
        <MenuItem
          icon="adjust"
          label="Dark/Light mode"
          onClick={_ => {
            console.log(this);
            let node = document.querySelector("body");
            node.classList[node.classList.contains("dark") ? "remove" : "add"](
              "dark"
            );
          }}
        />
      </div>
    );
  }
}

export default Settings;