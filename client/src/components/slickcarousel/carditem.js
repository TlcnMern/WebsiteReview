import React from 'react';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { API_URL } from '../../config/helper';
import Rating from '../rating/Rating';
import man from '../../public/images/man.png';
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const avatar = props.post.postedBy.avatar;
        var urlAvatar = '';
        if (avatar) {
            if (avatar.includes('dist')) {
                urlAvatar = API_URL + '/' + avatar;
            }
            else {
                urlAvatar = avatar;
            }
        }
        else {
            urlAvatar = man;
        }

  return (

    <Card className={classes.card} id="CardCarousel">
            <Link style={{width:'100%'}} to={
        {
          pathname: `/DetailPost/${props.post._id}`
        }
      }>
      <CardHeader className="row" id="CardCarouselHeader"
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img width="95%" height="95%" className="user_avatar_link " src={urlAvatar} alt="Nguyễn Tuấn Vũ " />
          </Avatar>
        }
        title={props.post.title}
        subheader={new Intl.DateTimeFormat('en-GB', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(props.post.created))}
      />
      </Link>
        <CardMedia
          className={classes.media}
          image={`${API_URL}/` + props.post.photo[0]}
          title="Paella dish"
        />

      <CardContent id="CardCarouselContent">
        <Typography variant="body2" color="textSecondary" component="p">
          {props.post.contentSummary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography style={{ fontSize: '15px' }} paragraph>Posted By: {props.post.postedBy.name}</Typography>
          <Typography style={{ fontSize: '15px' }} paragraph>
            Rating point: {props.post.pointRating.point} point/{props.post.pointRating.totalRate} vote
          </Typography>
          <div>
            <span>
              <Rating rating={props.post.pointRating.point - 1} disabled={true} />
            </span>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}