import React, { Component } from 'react';
import Settings from './settings/component.js';
import MenuItem from './menuitem/component.js';
import './style.css';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: (props.menuItems || []).map(x =>
                <MenuItem {...x} />
        )};
    }

    render() {
        return (
            <nav>
                <React.Fragment>
                    <Settings />
                    {this.state.menuItems}
                </React.Fragment>
            </nav>
        );
    }
}

export default Menu;
