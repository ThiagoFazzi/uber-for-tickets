import React, { Component } from 'react'
import { BrowserRouter as Router, Route /*, Redirect*/ } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import EventContainer from './components/event/eventContainer'
import EventDetailContainer from './components/event/eventDetailContainer'
import TicketDetailContainer from './components/ticket/ticketDetailContainer'
import EventFormContainer from './components/event/eventFormContainer'
import LogoutPage from './components/logout/LogoutPage'
import './App.css'
import TopBar from './components/layout/TopBar'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    marginTop: 20,
    padding: `20 ${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const App = withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props
      return (
        <div  className={classes.root}>
          <Router>
            <Grid container spacing={16}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <nav>
                  <TopBar />
                </nav>
              </Grid>
                <Grid item xs={12} md={12} lg={12}  xl={12}>
                  <Paper className={classes.paper}>
                    <Route exact path="/event/edit/:id" component={EventFormContainer} />
                    <Route exact path="/event/new" component={EventFormContainer} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/logout" component={LogoutPage} />
                    <Route exact path="/signup" component={SignupPage} />

                    <Route exact path="/" component={EventContainer} />
                    <Route exact path="/event/:id" component={EventDetailContainer} />
                    <Route exact path="/ticket/:id" component={TicketDetailContainer} />
                  </Paper>
                </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>xs=3</Paper>
              </Grid>
            </Grid>
          </Router>
        </div>
      )
    }
  }
)

App.propTypes = {
  classes: PropTypes.object,
};

export default App