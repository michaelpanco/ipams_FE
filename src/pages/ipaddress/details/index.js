import React from 'react';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import LoadingButton from './../../../components/_common/LoadingButton'
import Shimmer from './../../../components/_common/Shimmer'
import styles from './styles.module.css'
import api from './../../../config/api.routes'
import { getCookie } from './../../../utils/Cookie'

import AlertNotification from './../../../components/_common/AlertNotification'

import axios from 'axios';

import {
    ALERT_CLOSE,
    UPDATE_IPADDRESS_EDIT,
    UPDATE_IPADDRESS_CANCEL,
} from './../../../constant'

// Validation Utility
import FormValidator from './../../../utils/FormValidator';
import { IPAddressValidation } from './input.validation'

// Begin Service
import { update } from '../../../services/ipaddress/update';

const moment = require('moment')

class IPAddressDetails extends React.Component {

    constructor(props) {
        super(props);

        this.validateInput = new FormValidator(IPAddressValidation(this.state));


        this.state = {
            fetchingDetails: true,
            details: {},

            ipaddressid: '',
            ipaddress: '',
            iplabel: '',

            validIPAddress: this.validateInput.valid(),
        }

        this.submitted = false;
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleUpdateIPAddress = this.handleUpdateIPAddress.bind(this)
    }

    handleUpdateIPAddress(event) {

        event.preventDefault();
        let updateIPAddressValidation = this.validateInput.validate(this.state);
        this.submitted = true

        this.setState({ updateIPAddressValidation })

        if (!updateIPAddressValidation.isValid) {
            return false
        }

        this.props.updateIP(this.state);
    }

    handleInputChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    fetchIPAddressDetails(id) {

        this.setState({
            fetchingDetails: true,
        });

        axios.get(api().FETCHIPADDRESSDETAILS + '/' + id, {
            params: {},
            headers: {
                Authorization: 'Bearer ' + getCookie('token')
            }
        }).then((response) => {

            this.setState({
                fetchingDetails: false,
                details: response.data.details,

                ipaddressid: response.data.details.id,
                ipaddress: response.data.details.ip_address,
                iplabel: response.data.details.label,
            })

        }).catch(function (error) {
            console.log(error);
        })
    }

    componentDidMount() {

        this.fetchIPAddressDetails(this.props.match.params.id)
    }

    componentWillReceiveProps(props) {

        const { update_ipaddress } = props;

        if (update_ipaddress.succeeded) {
    
            this.setState(state => ({
                details: {
                    ...state.details,
                    ip_address: state.ipaddress,
                    label: state.iplabel,
                }
            }))
        }
    }

    render() {

        let { alert, update_ipaddress, editUpdateIP, editUpdateIPCancel, closeAlert } = this.props;

        let update_ip_validation = this.submitted ? this.validateInput.validate(this.state) : this.state.validIPAddress

        const IPAddressDetails =
            (<div className={styles.details__container}>
                
                <Grid container>
                    <Grid item sm={12}>

                        <Grid container spacing={2}>
                            <Grid item sm={3} className={styles.summaryLabel}>ID</Grid>
                            <Grid item sm={9} className={styles.rowValue}>
                                {this.state.details.id}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item sm={3} className={styles.summaryLabel}>IP Address</Grid>
                            <Grid item sm={9}> {this.state.details.ip_address } </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={3} className={styles.summaryLabel}>Label</Grid>
                            <Grid item xs={9}>
                                {!update_ipaddress.edit ? this.state.details.label :
                                    <div className={update_ip_validation.iplabel.isInvalid}>
                                        <TextField name="iplabel" className={styles.textfield} disabled={update_ipaddress.request} value={this.state.iplabel} variant="standard" required onChange={this.handleInputChange} />
                                        <span className="validation--err">{update_ip_validation.iplabel.message}</span>
                                    </div>
                                }
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item sm={3} className={styles.summaryLabel}>Datetime Created</Grid>
                            <Grid item sm={9}>{moment(this.state.details.created_at).format('D MMM YYYY h:mm A')} </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item sm={3} className={styles.summaryLabel}>Last Update</Grid>
                            <Grid item sm={9}>{moment(this.state.details.updated_at).format('D MMM YYYY h:mm A')} </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item sm={3}>&nbsp;</Grid>
                            <Grid item sm={9}>

                                {update_ipaddress.edit &&

                                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                        {!update_ipaddress.request &&
                                            <Button className={styles.button} color="primary" onClick={editUpdateIPCancel}>Cancel</Button>
                                        }
                                        <LoadingButton
                                            type="submit"
                                            className={styles.button}
                                            loading={update_ipaddress.requesting}
                                            disabled={update_ipaddress.requesting}
                                            done={update_ipaddress.submitted}
                                            color="primary"
                                            variant="contained"
                                            disableRipple
                                            disableFocusRipple
                                            onClick={this.handleUpdateIPAddress}
                                        >
                                            Update
                                        </LoadingButton>
                                    </Grid>
                                }

                            </Grid>
                        </Grid>


                    </Grid>
                </Grid>

            </div>
        )

        return (
            <React.Fragment>

                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <div className={styles.page__title}>IP Addresses</div>
                    </Grid>
                    <Grid item sm={6}>
                        <div className="text-right">
                            {!update_ipaddress.edit &&
                                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                    <Button className={styles.button} size="" color="primary" onClick={editUpdateIP}>Edit</Button>
                                </Grid>
                            }
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {this.state.fetchingDetails ? <Shimmer count={5} /> : IPAddressDetails}
                    </Grid>
                </Grid>
            
                <AlertNotification show={alert.submitted} variant={alert.status} message={alert.message} close={this.props.closeAlert} />

            </React.Fragment>
        );
    }
}

const matchDispatchToProps = (dispatch) => ({
    updateIP: (state) => dispatch(update(state)),
    closeAlert: () => dispatch({ type: ALERT_CLOSE }),
    editUpdateIP: () => dispatch({ type: UPDATE_IPADDRESS_EDIT }),
    editUpdateIPCancel: () => dispatch({ type: UPDATE_IPADDRESS_CANCEL }),

});

const mapStateToProps = (state) => ({
    alert: state.common.notify,
    update_ipaddress: state.ipaddress.update
});

export default withRouter(connect(mapStateToProps, matchDispatchToProps)((IPAddressDetails)))