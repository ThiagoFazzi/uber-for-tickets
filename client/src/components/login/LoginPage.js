import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {login} from '../../actions/users'
import { withStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'

const styles = theme => ({

	root: {
		marginTop: 20,
		marginBottom: 20,
		padding: `20 ${theme.spacing.unit * 3}px`,
		},
	  paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	  },
	});

class LoginPage extends PureComponent {

	handleSubmit = (data) => {
		this.props.login(data.email, data.password)
	}

	render() {
		const { classes } = this.props
		if (this.props.currentUser) return (
			<Redirect to="/" />
		)
		return (
            <div className={classes.root}>
                <Grid container >

                    <Grid item xs={12} md={12} lg={12} xl={12}>
						<h1>Login</h1>
                    </Grid>
					<Grid item xs={0} md={4} lg={4} xl={4}>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} xl={4}>
						<LoginForm onSubmit={this.handleSubmit} />
                    </Grid>
                    <Grid item xs={0} md={4} lg={4} xl={4}>
                    </Grid>
                </Grid>
            </div>
		)
	}
}


const mapStateToProps = (state) => ({
	currentUser: state.currentUser,
	error: state.login.error,
})

LoginPage.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(connect(mapStateToProps, {login})(LoginPage))
