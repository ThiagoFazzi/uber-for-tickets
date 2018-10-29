import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
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
    width: '45.9%',
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
})

class EventForm extends Component {

    state = {
        id: this.props.event ? this.props.event.id : null,
        name: this.props.event ? this.props.event.name : '',
        imageUrl: this.props.event ? this.props.event.imageUrl : '',
        dateStart: this.props.event ? this.props.event.dateStart : '',
        dateEnd: this.props.event ? this.props.event.dateEnd : '',
        description: this.props.event ? this.props.event.description : '',
        user: this.props.user ? this.props.user.id : '',
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            id: nextProps.event.id,
            name: nextProps.event.name,
            imageUrl: nextProps.event.imageUrl,
            dateStart: nextProps.event.dateStart,
            dateEnd: nextProps.event.dateEnd,
            description: nextProps.event.description,
            user: nextProps.user.id,
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target    
        this.setState({ 
            [name]: value 
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({user: this.props.user.id})
        this.props.saveEvent(this.state)
    }
  


    render() {
        const { classes } = this.props;
        const form = (
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
                <Button
                    variant="outlined" 
                    className={classes.button}
                >
                    <Link to={`/`} style={{textDecoration: 'none', color:'black'}} >  
                        Cancel
                    </Link>  
                </Button>
            </form>
        );
        return (
        <div>
            { form }
        </div>
        );
    }
}

export default withStyles(styles)(EventForm);