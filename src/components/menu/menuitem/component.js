import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SubMenu(props) {
  if (!props.items || props.items.length === 0) {
    return null;
  } else {
    return (
      <React.Fragment>
        <div className="sub-menu-indicator">
          <FontAwesomeIcon icon="box" />
          <FontAwesomeIcon icon="box-open" />
        </div>
        <div className="sub-menu"> {props.items} </div>
      </React.Fragment>
    );
  }
}

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: props.icon || "feather-alt",
      label_state: props.label.on ? 'on' : '',
      label_current: props.label.on || props.label,
      label_on: props.label.on || props.label,
      label_off: props.label.off || props.label,
      ref: props.href || "",
      onClick:
        props.onClick ||
        function() {
          window.location.hash = props.href;
        },
      subMenu: (props.subMenu || []).map((e, i) => <MenuItem {...e} key={i} />)
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="menu-item" data-ref={this.state.ref}>
          <div className="menu-item-wrapper" onClick={event => {
            this.state.onClick(event);
            if (this.state.label_state === '') return;
            let new_state = this.state.label_state === 'on' ? 'off' : 'on';
            this.setState({label_state: new_state});
            this.setState({label_current: this.state[`label_${new_state}`]});
          }}>
            <i title={this.state.label_current} data-state={this.state.label_state}>
              <FontAwesomeIcon icon={this.state.icon} />
            </i>
            <span> {this.state.label_current} </span>
          </div>
          <SubMenu items={this.state.subMenu} key={"none"} />
        </div>
      </React.Fragment>
    );
  }
}

export default MenuItem;