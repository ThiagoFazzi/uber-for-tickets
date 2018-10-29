import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListTickets from '@material-ui/icons/LocalPlay'
import EditEvent from '@material-ui/icons/Create'
import RemoveEvent from '@material-ui/icons/DeleteOutline'

const styles = {
  root: {
    alignItems: 'center'
  },
  card: {
    width: 280,
    margin: 10,
    //display: 'flow-root',
  },
  media: {
    height: 140,
  },
};

function EventCard({ event, user, classes }) {
  return (
      <div className={classes.root}>
        <Card className={classes.card} key={event.id}>
          <CardMedia
            className={classes.media}
            image={event.imageUrl}
            title={event.name}
          /> 
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {event.name}
            </Typography>
            <Typography component={'p'} >
              {event.dateStart} - {event.dateEnd}
            </Typography>
            <Typography component="p">
              {event.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>
              <Link to={`/event/${event.id}`} style={{textDecoration: 'none', color:'black'}} >
                <ListTickets />
              </Link>
            </Button>
            { 
              user && (user.id === event.user.id) && 
              <Button>
                <Link to={`/event/edit/${event.id}`} style={{textDecoration: 'none', color:'black'}} >  
                  <EditEvent />
                </Link>  
              </Button>
            }
            { 
              user && (user.id === event.user.id) && 
              <Button>
                <Link to={`/event/remove/${event.id}`} style={{textDecoration: 'none', color:'black'}} >  
                  <RemoveEvent />
                </Link>  
              </Button>
            }
          </CardActions>
        </Card>
      </div>
  )
}

EventCard.propTypes = {
  classes: PropTypes.object,
  event: PropTypes.object.isRequired,
  //user: PropTypes.object.isRequired
};

export default withStyles(styles)(EventCard)