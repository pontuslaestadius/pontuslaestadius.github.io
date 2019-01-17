import React, { Component } from 'react';
import Settings from './settings/component.js';
import MenuItem from './menuitem/component.js';
import Mobile from 'is-mobile';
import './style.css';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: (props.menuItems || []).map(x =>
                <MenuItem {...x} />
        )};
    }

    componentDidMount() {
        if (Mobile()) {
            document.querySelector('nav').classList.add('small');
        }
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
