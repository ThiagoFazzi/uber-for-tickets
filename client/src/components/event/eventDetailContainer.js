import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEvent } from '../../actions/events'
import EventDetail from './eventDetail'
import TicketList from '../ticket/ticketList'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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



class EventDetailContainer extends Component {

    componentDidMount(){
        console.log('entrei')
        
        const { match, event } = this.props
        console.log(match.params.id)
        console.log(event)
        this.props.getEvent(match.params.id)
    }
    
    render(){
        const { classes, event } = this.props
        if(!event) return <p>Loading...evento</p>
        return(
            <div className={classes.root}>
                <Grid container >
                    <Grid item md={1} lg={1} xl={1}>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} xl={6}>
                        <EventDetail event={event} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} xl={6}>
                        {   
                            (!event.tickets)? <p>no tickets</p> : <TicketList tickets={event.tickets} />
                        } 
                    </Grid>
                    <Grid item md={1} lg={1} xl={1}>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


function mapStateToProps(state, props) {
    const { match } = props;
    console.log(match.params.id)
    if (match.params.id) {
      return {
        event: state.events.filter((event) => Number(event.id) === Number(match.params.id))[0],
        user: state.users
      }
    }
  
    return { 
      event: null,
      user: state.users
    }
}

const mapDispatchToProps = {
    getEvent
}

EventDetailContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EventDetailContainer))

