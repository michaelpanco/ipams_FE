import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';

const styles = {

    success: {
        backgroundColor: '#43a047'
    },
    error: {
        backgroundColor: '#d32f2f',
    },
    info: {
        backgroundColor: '#1976d2',
    },
    warning: {
        backgroundColor: '#ffa000',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10
    }
};

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

class AlertNotifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            snackbarShow: true,
        }
    }

    render() {

        const { classes, variant, message, show, close} = this.props;
        const Icon = variantIcon[variant];

        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={show}
                autoHideDuration={6000}
                onClose={close}
                variant="success">

                <SnackbarContent
                    className={clsx(classes[variant])}
                    message={
                        <div className={classes.message}>
                            <Icon className={clsx(classes.icon, classes.iconVariant)} />
                            {message}
                        </div>
                    }

                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={close}>
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        )
    }
}

AlertNotifications.propTypes = {
	show: PropTypes.bool,
    variant: PropTypes.string,
    message: PropTypes.string,
    close: PropTypes.func,
};

export default withStyles(styles)(AlertNotifications);
