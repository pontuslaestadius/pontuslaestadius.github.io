import React, { Component } from 'react';
import MenuItem from './../menuitem/component.js';
import './style.css';

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
    constructor(props) {
        super(props);
    }

    render() {
        let icon = <Icon/>;
        return (
            <div className="settings">
                <MenuItem icon='igloo' title='home' href={'#root'} label={icon} />
                <MenuItem icon='bars' label="Small sidebar" onClick={e => {
                    let node = document.querySelector('nav');
                    node.classList[node.classList.contains('small')?'remove':'add']('small');
                }}/>
        </div>
        );
    }
}

export default Settings;
