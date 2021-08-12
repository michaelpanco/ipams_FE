import React from 'react';
import axios from 'axios';
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
import Shimmer from './../../components/_common/Shimmer'

const moment = require('moment')

class Activities extends React.Component {

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

        this.callFetchActivities= this.callFetchActivities.bind(this)
    }

    componentDidMount() {
        
        this.callFetchActivities()
    }

    callFetchActivities() {

        axios.get(api().FETCHACCOUNTACTIVITIES, {
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
            this.callFetchActivities()
        })
    }

    handleChangeRowsPerPage(obj) {

        let limit = obj.target.value

        this.setState({
            recordLimit: limit,
            fetchingData: true
        }, function (){
            this.callFetchActivities()
        })
    }

    render() {

        const listItems = this.state.records.map((record) => {
            return (<TableRow key={record.leadID}>
                <TableCell className={styles.tableCell} component="th" scope="row" > {record.id} </TableCell>
                <TableCell className={styles.tableCell}> {record.type} </TableCell>
                <TableCell className={styles.tableCell}> {record.message} </TableCell>
                <TableCell className={styles.tableCell}> {moment(record.created_at).format('D MMM YYYY h:mm A')} </TableCell>

            </TableRow>)
        });

        return (
            <React.Fragment>

                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <div className={styles.page__title}>Activities</div>
                    </Grid>
                </Grid>

                {this.state.fetchingData ?

                    <Shimmer count={5} /> 

                    :

                    <React.Fragment>

                        <Table aria-label="leads" >
                            <TableHead >
                                <TableRow >
                                    <TableCell className={styles.tableHeadCell}> ID </TableCell>
                                    <TableCell className={styles.tableHeadCell}> Type </TableCell>
                                    <TableCell className={styles.tableHeadCell}> Action </TableCell>
                                    <TableCell className={styles.tableHeadCell}> Date </TableCell>
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

            </React.Fragment>
        );
    }
}

export default Activities