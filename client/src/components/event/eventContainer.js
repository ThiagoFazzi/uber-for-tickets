import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { userId } from '../../jwt'
import { getEvents, addEvent } from '../../actions/events'
import { getUser } from '../../actions/users'
import EventsList from './eventsList'
import Button from '@material-ui/core/Button'
import AddEventIcon from '@material-ui/icons/AddCircleOutline'
import Typography from '@material-ui/core/Typography';
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

class EventContainer extends Component {

    componentWillMount(){
        const {user, userId } = this.props
        if(userId){
            if(user === null)this.props.getUser(userId)
        }
    }

    componentDidMount() {
        this.props.getEvents()
    }
        
    render(){
        const { classes, events, user } = this.props
        if(!events) return <p>Loading...</p>
        return(
            <div className={classes.root}>
                <Grid container >

                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        { 
                            user &&
                            <Button>
                                <Link to={`/event/new`} style={{textDecoration: 'none', color:'black'}} >  
                                    <Typography component={'h2'}>
                                    <AddEventIcon /><span>Add new Event</span>
                                    </Typography>
                                </Link>  
                            </Button>
                        }
                    </Grid>
					<Grid item  md={2} lg={2} xl={2}>
                    </Grid>
                    <Grid item xs={12} md={10} lg={10} xl={10}>
                        <EventsList events={events} user={user}/>
                    </Grid>
                    <Grid item  md={2} lg={2} xl={2}>
                    </Grid>
                </Grid>
            </div>
        )   
    }
}

EventContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    //events: PropTypes.array.isRequired,
    //user: PropTypes.object.isRequired,
    getEvents: PropTypes.func.isRequired,
  }

const mapStateToProps = state => ({
    events: state.events,
    currentUser: state.currentUser,
    userId: state.currentUser && userId(state.currentUser.jwt),
    user: state.users
})

const mapDispatchToProps = {
    getEvents,
    addEvent,
    getUser
}

export default  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EventContainer))