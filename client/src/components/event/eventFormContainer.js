import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addEvent, getEvent, updateEvent } from '../../actions/events'
import EventForm from './eventForm';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types';

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
  
class EventFormContainer extends React.Component {

  state = {
    redirect: false
  }

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params.id) {
      this.props.getEvent(match.params.id);
    }
  }

  saveEvent = (data) => {
    if (data.id) {
      this.setState({ redirect: true })
      return this.props.updateEvent(data)
    } else {
      this.setState({ redirect: true })
      return this.props.addEvent(data)


    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container >
          <Grid item xs={0} md={3} lg={3} xl={3}>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            {
              this.state.redirect ?
              <Redirect to="/" /> :
              <EventForm
                event={this.props.event}
                user={this.props.user}
                saveEvent={this.saveEvent}
              />
            }
          </Grid>
          <Grid item xs={0} md={3} lg={3} xl={3}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

EventFormContainer.propTypes = {
  classes: PropTypes.object.isRequired,

}

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params.id) {
    return {
      event: state.events.filter((event) => Number(event.id) === Number(match.params.id))[0],
      user: state.users
    }
  }

  return { 
    event: null,
    user: state.users
   };
}

export default withStyles(styles)(connect(mapStateToProps, { addEvent, getEvent, updateEvent })(EventFormContainer))