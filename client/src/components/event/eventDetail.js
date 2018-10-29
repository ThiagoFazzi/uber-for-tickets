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
    maxWidth: 350,
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};

function eventDetail(props) {
  const { classes, event } = props;
  return (
    <Card className={classes.card}>
        <CardMedia
          component="img"
          className={classes.media}
          height="140"
          image={event.imageUrl}
          title={event.name}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {event.name}
          </Typography>
          <Typography gutterBottom component="p">
            Date: {event.dateStart} - {event.dateEnd}
          </Typography>
          <Typography component="p">
            {event.description}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link to="/">All Events</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

eventDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(eventDetail);