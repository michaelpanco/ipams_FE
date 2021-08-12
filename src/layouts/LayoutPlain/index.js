import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import styles from './styles.module.css'

class DefaultInterior extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    {this.props.children}
                </Container>
            </React.Fragment>
        );
    }
}

export default DefaultInterior