import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import api from './../../config/api.routes'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getCookie } from './../../utils/Cookie'
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import styles from './styles.module.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Shimmer from './../../components/_common/Shimmer'

// Initiate Modals
import ModalCreateIPAddress from './../_modals/ipaddress/new'

// Alert
import AlertNotification from './../../components/_common/AlertNotification'

import {
    ALERT_CLOSE,
    CREATE_IPADDRESS_NEW,
    CREATE_IPADDRESS_CLOSE,
} from './../../constant'

const moment = require('moment')

class IPAddress extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            records: [],
            recordCount: 0,
            fetchingData: true,

            recordPage: 1,
            recordLimit: 10,
        }
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)

        this.callFetchIPAddresses = this.callFetchIPAddresses.bind(this)
    }

    componentDidMount() {
        
        this.callFetchIPAddresses()
    }

    callFetchIPAddresses() {

        axios.get(api().FETCHIPADDRESSES, {
            params: {
                page: this.state.recordPage,
                limit: this.state.recordLimit,
            }, 
            headers: {
                Authorization: 'Bearer ' + getCookie('token')
            }
        }).then((response) => {
            this.setState({
                records: response.data.records,
                recordCount: response.data.total,
                fetchingData: false
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    handleChangePage(obj, page) {

        let nextpage = page + 1

        this.setState({
            recordPage: nextpage,
            fetchingData: true
        }, function (){
            this.callFetchIPAddresses()
        })
    }

    handleChangeRowsPerPage(obj) {

        let limit = obj.target.value

        this.setState({
            recordLimit: limit,
            fetchingData: true
        }, function (){
            this.callFetchIPAddresses()
        })

    }

    render() {

        let { alert, create_ipaddress, editUpdateIPCancel, createIPAddressNew, createIPAddressClose, closeAlert } = this.props;

        const listItems = this.state.records.map((record) => {
            return (<TableRow key={record.leadID}>
                <TableCell className={styles.tableCell} component="th" scope="row" > {record.id} </TableCell>
                <TableCell className={styles.tableCell}> {record.ip_address} </TableCell>
                <TableCell className={styles.tableCell}> {record.label} </TableCell>
                
                <TableCell className={styles.tableCell}> {moment(record.created_at).format('D MMM YYYY h:mm A')} </TableCell>
                <TableCell className={styles.tableCell__right}> 
                    <Link to={`/ipaddress/${record.id}`} className={styles.tableLink} > Details </Link>
                </TableCell>
            </TableRow>)
        });


        return (
            <div>
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                            <div className={styles.page__title}>IP Addresses</div>
                        </Grid>
                        <Grid item sm={6}>
                            <div className="text-right">
                                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                    <Button className={styles.button_sm} size="sm" variant="contained" onClick={createIPAddressNew} color="primary">Add New IP</Button>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>

                    {this.state.fetchingData ?

                        <Shimmer count={5} /> 

                        :

                        <React.Fragment>

                            <Table aria-label="leads" >
                                <TableHead >
                                    <TableRow >
                                        <TableCell className={styles.tableHeadCell}>ID</TableCell>
                                        <TableCell className={styles.tableHeadCell}> IP Address </TableCell>
                                        <TableCell className={styles.tableHeadCell}> Label </TableCell>
                                        <TableCell className={styles.tableHeadCell}> Date Created </TableCell>
                                        <TableCell className={styles.tableHeadCell}>&nbsp;</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {listItems}
                                </TableBody>
                            </Table>

                            <TablePagination
                                rowsPerPage={this.state.recordLimit}
                                count={this.state.recordCount}
                                page={this.state.recordPage - 1}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                className={styles.tablePagination}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />

                        </React.Fragment>

                    }

                    <ModalCreateIPAddress open={create_ipaddress.new} onClose={createIPAddressClose} />
                    <AlertNotification show={alert.submitted} variant={alert.status} message={alert.message} close={this.props.closeAlert} />

            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    closeAlert: () => dispatch({ type: ALERT_CLOSE }),
    createIPAddressNew: () => dispatch({ type: CREATE_IPADDRESS_NEW }),
    createIPAddressClose: () => dispatch({ type: CREATE_IPADDRESS_CLOSE }),
});

const mapStateToProps = (state) => ({
    alert: state.common.notify,
    create_ipaddress: state.ipaddress.create
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IPAddress))