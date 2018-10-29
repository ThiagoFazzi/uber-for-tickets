import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  price: {
    textAlign: 'right',
  }
});

function ticketList(props) {
    const { classes, tickets } = props;
    return (
      <div className={classes.root}>
            <div className={classes.demo}>
              <List>
                {tickets.map(ticket =>
                <div>
                  <ListItem key={ticket.id}>
                    <ListItemAvatar>
                      <Avatar 
                        alt={ticket.user.firstName}
                        src={ticket.user.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                        primary={ticket.user.firstName}
                        secondary={ticket.description}
                    />

                    <ListItemText className={classes.price}
                        primary={ticket.price}

                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Info">
                        <Link to={`/ticket/${ticket.id}`} ><InfoIcon /></Link>
                      </IconButton>
                    </ListItemSecondaryAction>

                  </ListItem>
                  <Divider />
                  </div>
                )}
              </List>
            </div>
      </div>
    );
}


ticketList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ticketList);