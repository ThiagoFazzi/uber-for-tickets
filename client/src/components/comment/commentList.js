import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginBottom: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

function commentList(props) {
    const { classes, comments } = props;
    return (
        <div>
            {comments.map(comment =>
            <Card className={classes.card} key={comment.id}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}
                        src={comment.user.avatar}
                    />
                }
                title={comment.user.firstName}
                subheader={comment.date}
            />
            <CardContent>
                <Typography paragraph>
                    {comment.description}
                </Typography>
            </CardContent>
        </Card>
        )}
      </div>
    );
}


commentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(commentList);