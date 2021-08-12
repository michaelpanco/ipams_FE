import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './styles.module.css'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        let { account } = this.props;

        return (
            <div>
                <div className={styles.dashboard__intro}>Hi <strong>{account.name}</strong></div>
                <div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    account: state.session.user,
});

export default withRouter(connect(mapStateToProps)((Dashboard)))