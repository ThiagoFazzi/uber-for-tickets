import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTicket } from '../../actions/tickets'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TicketDetail from './ticketDetail'
import CommentList from '../comment/commentList'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


    class TicketDetailContainer  extends Component {

        componentDidMount(){  
            const { match } = this.props
            this.props.getTicket(match.params.id)
        }

        render(){
            console.log(this.props.ticket)
            const { classes, ticket } = this.props
            if(!ticket) return <p>Loading...</p>
            return(
                <div className={classes.root}>
                    <Grid container spacing={24}>

                        <Grid item  md={1}></Grid>

                        <Grid item xs={12} md={6}>
                            <TicketDetail ticket={ticket} />
                        </Grid>

                        <Grid item xs={12} md={4}>
                        {
                            (!ticket.comments)? <p>no comments</p> : <CommentList comments={ticket.comments} />
                        }
                        </Grid>

                        <Grid item md={1}></Grid>

                    </Grid>
                </div>
            )
        }
    }


const mapStateToProps = state =>({
    ticket: state.tickets
})

const mapDispatchToProps = {
    getTicket
}

TicketDetailContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TicketDetailContainer))