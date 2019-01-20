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
        <MenuItem icon="igloo" title="home" href="#root" label={icon} noShadow={true} />
        <MenuItem
          icon="bars"
          label={{on: "Collapse", off: "Expand"}}
          onClick={_ => {
            let node = document.querySelector("nav");
            node.classList[node.classList.contains("small") ? "remove" : "add"](
              "small"
            );
          }}
        />
        <MenuItem
          icon="adjust"
          label={{on: "Dark mode", off: "Normal mode"}}
          onClick={_ => {
            let node = document.querySelector("body");
            node.classList[node.classList.contains("dark") ? "remove" : "add"](
              "dark"
            );
          }}
        />

        <MenuItem
          icon="archive"
          label={{on: "Persist settings", off: "Forget settings"}}
          onClick={event => {
            if (event !== undefined && localStorage.getItem('persist')) {
              localStorage.clear();
            } else {
              localStorage.setItem('persist', true);
            }
          }}
        />

        <MenuItem filler={true} label='' />
      </div>
    );
  }
}

export default Settings;