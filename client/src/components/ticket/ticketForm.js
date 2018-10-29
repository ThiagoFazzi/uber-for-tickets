import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textFieldDate: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '47%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class TicketForm extends PureComponent {
	state = {user: ''}

	handleSubmit = (e) => {
        e.preventDefault()
        this.setState({user: this.props.user.id})
        const data = this.state
        this.props.onSubmit(data)
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
            <div>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <Typography variant="headline">
                        Create a new Event
                    </Typography>
                    
                    <TextField
                    id="outlined-name"
                    label="Name"
                    name="name"
                    className={classes.textField}
                    type="text"
                    value={ this.state.name || ''}
                    onChange={ this.handleChange }
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />

                    <TextField
                    id="outlined-image-url"
                    label="Image(url)"
                    name="imageUrl"
                    className={classes.textField}
                    value={ this.state.imageUrl || ''}
                    onChange={ this.handleChange }
                    type="text"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />

                    <TextField
                    id="date-start"
                    label="Date Start"
                    name="dateStart"
                    type="date"
                    className={classes.textFieldDate}
                    value={ this.state.dateStart || ''}
                    onChange={ this.handleChange }
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />

                    <TextField
                    id="date-end"
                    label="Date End"
                    name="dateEnd"
                    type="date"
                    className={classes.textFieldDate}
                    value={ this.state.dateEnd || ''}
                    onChange={ this.handleChange }
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />

                    <TextField
                    id="outlined-description"
                    label="Description"
                    multiline
                    rows="4"
                    className={classes.textArea}
                    value={ this.state.description || ''}
                    onChange={ this.handleChange }
                    type="text"
                    name="description"
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

TicketForm.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(TicketForm);