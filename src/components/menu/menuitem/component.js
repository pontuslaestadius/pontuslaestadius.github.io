import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function SubMenu(props) {
    if (!props.items || props.items.length === 0) {
        return (null);
    } else  {
        return(
            <React.Fragment>
                <div className='sub-menu-indicator'>
                    <FontAwesomeIcon icon='box' />
                    <FontAwesomeIcon icon='box-open' />
                </div>

                <div className="sub-menu">
                    {props.items}
                </div>
            </React.Fragment>
        );
    }
}

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: props.icon || 'feather-alt',
            label: props.label,
            title: props.title || props.label,
            ref: props.href || '',
            onClick: props.onClick || function(){window.location.hash = props.href},
            subMenu: (props.subMenu || []).map((e, i) =>
                <MenuItem {...e} key={i} />
            )
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className='menu-item' onClick={this.state.onClick} data-ref={this.state.ref}>
                    <i title={this.state.title}>
                        <FontAwesomeIcon icon={this.state.icon} />
                    </i>
                    <span>{this.state.label}</span>
                    <SubMenu items={this.state.subMenu} key={'none'} />
                </div>
            </React.Fragment>
        );
    }
}

export default MenuItem;
