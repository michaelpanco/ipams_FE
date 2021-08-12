import React from 'react';
import TextField from '@material-ui/core/TextField';
import LoadingButton from './../_common/LoadingButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// Begin Service
import { login } from '../../services/account/login';

// Validation Utility
import FormValidator from './../../utils/FormValidator';
import { loginValidation } from './input.validation'

import styles from './styles.module.css'

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.validateInput = new FormValidator(loginValidation(this.state));

        this.state = {
            username: '',
            password: '',

            validLogin: this.validateInput.valid(),
        }

        this.submitted = false;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        let loginValidation = this.validateInput.validate(this.state);
        this.submitted = true
        this.setState({ loginValidation })

        if (!loginValidation.isValid) {
            return false
        }
        
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
        let login_validation = this.submitted ? this.validateInput.validate(this.state) : this.state.validLogin

        return (

            <form className={styles.form} noValidate onSubmit={this.handleSubmit}>

                <div className={styles.login__err}>{login.message}</div>

                <div className={login_validation.username.isInvalid}>
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
                        disabled={login.requesting}
                        onChange={this.handleInputChange}
                    />
                    <span className="validation--err">{login_validation.username.message}</span>
                </div>

                <div className={login_validation.password.isInvalid}>
                    <TextField
                        variant="outlined"
                        className={styles.login__field_mb10}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        disabled={login.requesting}
                        autoComplete="current-password"
                        onChange={this.handleInputChange}
                    />
                    <span className="validation--err">{login_validation.password.message}</span>
                </div>


                <LoadingButton
                    type="submit"
                    className={styles.login__button}
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