import React from 'react';

class DefaultInterior extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return (
            <div>
                    sadasdsad

                    {this.props.children}
            </div>
        );
    }
}



export default DefaultInterior