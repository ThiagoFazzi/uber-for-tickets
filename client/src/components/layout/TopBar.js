import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  color: {
    backgroundColor: 'gray',
  },

  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 1,
  },
  bigAvatar: {
    width: 35,
    height: 35,
    textAlign: 'rigth',
    paddingLeft: 0,
  },
};


const TopBar = (props) => {
  const { history, user, classes } = props
  return (
    <AppBar position="absolute" style={{zIndex:10}} className={classes.color}>
      <Toolbar>
        <Typography variant="title" color="inherit" style={{flex: 1}}>
          <Button color="inherit" onClick={() => history.push('/')}>Uber for Tickets</Button>
        </Typography>
        {
          !user && <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
        }
        {
          !user && <Button color="inherit" onClick={() => history.push('/signup')}>Sign up</Button>
        }
        {
          user && 
          <div>

            <Button color="inherit">
              <Avatar
                alt={user.firstName}
                src={user.avatar}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
              {`${user.firstName} ${user.lastName}`}
            </Button> 
          </div>
        }
        { 
          user && <Button color="inherit"onClick={() => history.push('/logout')}>Logout</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  //user: state.currentUser && state.users &&
  //  state.users[userId(state.currentUser.jwt)]

  currentUser: state.currentUser,
  user: state.users
})

TopBar.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(withRouter(
  connect(mapStateToProps)(TopBar)
))
