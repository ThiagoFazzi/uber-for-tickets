import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: '100%',
  },
  green: {
    backgroundColor: 'green'
  },

  yellow: {
    backgroundColor: 'yellow'
  },

  red: {
    backgroundColor: 'red'
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};

function ticketDetail(props) {
  const { classes, ticket } = props;
  console.log(ticket)
  return (
    <Card className={classes.card}>
        <CardMedia
          component="img"
          className={classes.media}
          height="140"
          image={ticket.imageUrl}
          title={ticket.description}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Price: {ticket.price}
          </Typography>          
          
          {
            (ticket.risk < 10) ? 
            <Typography gutterBottom variant="headline" component="h2" className={ classes.green }>
            Risk: {`${ticket.risk} %`}
          </Typography> : null
          }
          
          {
            (ticket.risk > 10 && ticket.risk < 50 ) ? 
            <Typography gutterBottom variant="headline" component="h2" className={ classes.yellow }>
            Risk: {`${ticket.risk} %`}
          </Typography> : null
          }
                    {
            (ticket.risk >50) ? 
            <Typography gutterBottom variant="headline" component="h2" className={ classes.red }>
            Risk: {`${ticket.risk} %`}
          </Typography> : null
          }


          <Typography component="p">
            {ticket.description}
          </Typography>
          <Typography component="p">
           
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={`/`} >All Events</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

ticketDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ticketDetail);

// Seller: {`${ticket.user.firstName} ${ticket.user.lastName}`}