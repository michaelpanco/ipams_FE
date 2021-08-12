import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// Import login Component
import Login from './../../components/Login'

import styles from './styles.module.css'

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return (
            <React.Fragment>
     
                    <div className={styles.login__container}>
                        <Avatar className={styles.login__avatar}></Avatar>
                        <Typography className={styles.login__intro}>
                            Sign in your IPAM Account
                        </Typography>
                    </div>

                    <Login />
            
            </React.Fragment>
        );
    }
}



export default LoginPage