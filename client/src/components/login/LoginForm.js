import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class LoginForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		const { classes } = this.props;
		return (
      <div className="login-form">			
				<form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
				
				<TextField
				id="outlined-email"
				label="Email"
				name="email"
				className={classes.textField}
				type="email"
				value={ this.state.email || ''}
				onChange={ this.handleChange }
				margin="normal"
				variant="outlined"
				InputLabelProps={{
						shrink: true,
				}}
				/>
				<TextField
				id="outlined-name"
				label="Password"
				name="password"
				className={classes.textField}
				type="password"
				value={ this.state.password || ''}
				onChange={ this.handleChange }
				margin="normal"
				variant="outlined"
				InputLabelProps={{
						shrink: true,
				}}
				/>
				<Button 
						variant="outlined" 
						className={classes.button}
						type="submit"
				>
						Save
				</Button>
		</form>
	</div>
			
		)
	}
}

LoginForm.propTypes = {
	classes: PropTypes.object,
};

export default withStyles(styles)(LoginForm);