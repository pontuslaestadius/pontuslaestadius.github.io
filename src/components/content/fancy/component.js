import React, {
    Component
} from 'react';
import Header from './../header.js'

class FancySection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            links: props.links,
            images: props.images,
            background: props.background,
            description: props.description
        };
    }
    render() {
        return ( <
            div className = 'section section-large'
            data-background = {
                this.state.background
            } >
            <
            React.Fragment >
            <
            div className = 'section-image-wrapper' >
            <
            div className = 'section-lr' >
            <
            div className = 'section-left' >
            <
            div className = 'section-left-header' >
            <
            Header title = {
                this.state.title
            }
            /> <
            div className = 'section-links' > {
                this.state.links
            } <
            /div> < /
            div > {
                this.state.description
            } <
            /div> <
            div className = 'section-right' > {
                this.state.images
            } <
            /div> < /
            div > <
            /div> < /
            React.Fragment > <
            /div>
        );
    }
}

export default FancySection;