import React from 'react';
import TextField from '@material-ui/core/TextField';
import LoadingButton from './../_common/LoadingButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// Begin Service
import { login } from '../../services/account/login';

import styles from './styles.module.css'

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.accountLogin(this.state); 
    }

    handleInputChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {

        const { login } = this.props;

        return (

            <form className={styles.form} noValidate onSubmit={this.handleSubmit}>

                <TextField
                    variant="outlined"
                    className={styles.login__field}
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={this.handleInputChange}
                />
                <TextField
                    variant="outlined"
                    className={styles.login__field}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleInputChange}
                />

                <LoadingButton
                    type="submit"
                    className={styles.login__buton}
                    loading={login.requesting}
                    disabled={login.requesting}
                    done={login.completed}
                    fullWidth
                    color="primary"
                    variant="contained"
                    disableRipple
                    disableFocusRipple
                >
                    Sign In
                </LoadingButton>
            </form>
        );
    }
}

const matchDispatchToProps = (dispatch) => ({
    accountLogin: (state) => dispatch(login(state)),
});

const mapStateToProps = (state) => ({
    login: state.account.login
});

export default withRouter(connect(mapStateToProps, matchDispatchToProps)((Login)))