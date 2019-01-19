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
    let loaded = !props.icon ? false : localStorage.getItem(props.icon);
    let icon_state = loaded || 'on';

    this.state = {
      ref: props.href || '',
      filler: props.filler || false,
      icon: props.icon || "feather-alt",
      label_state: props.label.on ? icon_state : '',
      label_current: props.label.on || props.label,
      label_on: props.label.on || props.label,
      label_off: props.label.off || props.label,
      onClick:
        props.onClick ||
        function() {
          window.location.hash = props.href;
        },
      subMenu: (props.subMenu || []).map((e, i) => <MenuItem {...e} key={i} />)
    };
  }

  componentDidMount() {
    if (this.state.label_state !== 'off') return;
    console.log(`Loaded persisted setting ${this.state.icon}=${this.state.label_state}`);
    this.switchLabel(undefined, 'off');
  }

  switchLabel(event, new_state) {
    this.state.onClick(event);
    if (this.state.label_state === '') return;
    new_state = new_state || this.state.label_state === 'on' ? 'off' : 'on';
    this.setState({
      label_state: new_state,
      label_current: this.state[`label_${new_state}`]
    });
    return new_state;
  }

  render() {
    let icon = this.state.filler ?
      <svg className='svg-inline--fa'></svg> :
      <FontAwesomeIcon icon={this.state.icon} />;

    return (
      <React.Fragment>
        <div className="menu-item" data-filler={this.state.filler} data-ref={this.state.ref}>
          <div className="menu-item-wrapper" onClick={event => {
            const new_state = this.switchLabel(event);
            if (localStorage.getItem('persist')) {
              localStorage.setItem(this.state.icon, new_state);
            }
          }}>
          <i title={this.state.label_current} data-state={this.state.label_state}>
            {icon}
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