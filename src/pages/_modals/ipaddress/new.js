import React, { useCallback } from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom'


import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import LoadingButton from './../../../components/_common/LoadingButton';

import { getCookie } from './../../../utils/Cookie'
import FormValidator from './../../../utils/FormValidator';
import api from '../../../config/api.routes'

//actions
import { create } from './../../../services/ipaddress/create'
import { IPAddressValidation } from './input.validation'

import styles from './styles.module.css'

const DialogTitle = withStyles(styles)(props => {

    const { children, onClose, ...other } = props;

    return (
        <MuiDialogTitle disableTypography className={styles.root} {...other}>

            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Typography className={styles.dialogTitleText}>{children}</Typography>
                </Grid>
                <Grid item xs={3} container alignItems="flex-start" justify="flex-end">
                    {onClose ? (
                        <a href="javascript:;" onClick={onClose}>
                            <CloseIcon className={styles.closeIcon} />
                        </a>
                    ) : null}
                </Grid>
            </Grid>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: 20,
        maxWidth: 900
    }
    
}))(MuiDialogContent);


class ComposeMessageModal extends React.Component {

    constructor(props) {
        super(props);

        this.validateInput = new FormValidator(IPAddressValidation(this.state));

        this.state = {

            ipaddress: '',
            iplabel: '',

            validIPAddress: this.validateInput.valid(),
        }

        this.loader = false;
        this.submitted = false;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreateIPAddress = this.handleCreateIPAddress.bind(this)
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleCreateIPAddress(event) {
        event.preventDefault();

        let createIPAddressValidation = this.validateInput.validate(this.state);
        this.submitted = true

        this.setState({ createIPAddressValidation })

        if (!createIPAddressValidation.isValid) {
            return false
        }

        this.props.createIPAddress(this.state);
    }

    render() {

        const { open, onClose, create_ipaddress } = this.props;

        let update_ip_validation = this.submitted ? this.validateInput.validate(this.state) : this.state.validIPAddress

        return (
 
            <Dialog onClose={onClose} maxWidth="false" open={open} className={styles.dialogPaper}>

                <DialogTitle onClose={onClose} className={styles.dialogTitle}>
                    Create new IP Address
                </DialogTitle>

                <DialogContent className={styles.dialogContent} dividers>


                    <Grid container spacing={2} className="tabPanel mb20" >
                        <Grid item sm={12}>
                            <div className={update_ip_validation.ipaddress.isInvalid, styles.mb5}>
                                <TextField name="ipaddress" className={styles.textfield} disabled={create_ipaddress.requesting} label="IP Address" value={this.state.ipaddress} variant="outlined" required fullWidth onChange={this.handleInputChange} />
                                <span className="validation--err">{update_ip_validation.ipaddress.message}</span>
                            </div>
                        </Grid>
                    </Grid>
 
                    <Grid container spacing={2} className="tabPanel mb20" >
                        <Grid item sm={12}>
                            <div className={update_ip_validation.iplabel.isInvalid, styles.mb5}>
                                <TextField name="iplabel" className={styles.textfield} disabled={create_ipaddress.requesting} label="Label" value={this.state.iplabel} variant="outlined" required fullWidth onChange={this.handleInputChange} />
                                <span className="validation--err">{update_ip_validation.iplabel.message}</span>
                            </div>
                        </Grid>
                    </Grid>
 
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                <Button className={styles.button} color="primary" onClick={onClose}>Cancel</Button>
                                <LoadingButton
                                    type="submit"
                                    className={styles.button}
                                    loading={create_ipaddress.requesting}
                                    disabled={create_ipaddress.requesting}
                                    done={create_ipaddress.requesting}
                                    color="primary"
                                    variant="contained"
                                    disableRipple
                                    disableFocusRipple
                                    onClick={this.handleCreateIPAddress}
                                >
                                    Create
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Grid>

                </DialogContent>


            </Dialog>
    
        );
    }
}

const matchDispatchToProps = (dispatch) => ({

    createIPAddress: (state) => dispatch(create(state)),
});

const mapStateToProps = (state) => ({
    create_ipaddress: state.ipaddress.create,
});

export default withRouter(connect(mapStateToProps, matchDispatchToProps)((ComposeMessageModal)))