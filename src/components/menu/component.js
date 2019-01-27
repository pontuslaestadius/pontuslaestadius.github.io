import React, {
    Component
} from 'react';
import Settings from './settings/component.js';
import MenuItem from './menuitem/component.js';
import Mobile from 'is-mobile';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: (props.menuItems || []).map(x =>
                <MenuItem {...x} />
            )
        };

      if (Mobile()) {
        localStorage.setItem('bars', 'off');
        document.querySelector('body').classList.add('mobile');
      }
    }

    render() {
      return (
        <nav className="box-shadow">
          <React.Fragment>
            <Settings />
            {this.state.menuItems}
          </React.Fragment>
        </nav>
      );
    }
}

export default Menu;