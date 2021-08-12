import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
    button: {
        margin: '10px 0px',
    },
    circular : {
        color: '#ffffff',
        marginRight: 10
    }
});

const LoadingButton = (props) => {
    const { classes, loading, done, ...other } = props;

    if (done) {
        return (
            <Button className={classes.button} {...other}>
                {props.children}
            </Button>
        );
    }
    else if (loading) {
        return (
            <Button className={classes.button}  {...other}>
                <CircularProgress size={16} thickness={4} className={classes.circular} /> {props.children}
            </Button>
        );
    } else {
        return (
            <Button className={classes.button} {...other} />
        );
    }
}

LoadingButton.defaultProps = {
    loading: false,
    done: false,
};

LoadingButton.propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    done: PropTypes.bool,
};

export default withStyles(styles)(LoadingButton);